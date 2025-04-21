import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  Timestamp, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const useFirestore = <T extends { id?: string }>(collectionName: string) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getItems = async (constraints: any[] = []) => {
    setLoading(true);
    try {
      const q = query(
        collection(db, collectionName),
        ...constraints
      );
      
      const snapshot = await getDocs(q);
      const documents: T[] = snapshot.docs.map((doc) => ({
        ...doc.data() as T,
        id: doc.id,
      }));
      
      setItems(documents);
      setLoading(false);
      return documents;
    } catch (err) {
      console.error('Error getting documents:', err);
      setError('Failed to fetch items');
      setLoading(false);
      return [];
    }
  };

  const getItem = async (id: string) => {
    setLoading(true);
    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setLoading(false);
        return { id: docSnap.id, ...docSnap.data() } as T;
      } else {
        setError('Item not found');
        setLoading(false);
        return null;
      }
    } catch (err) {
      console.error('Error getting document:', err);
      setError('Failed to fetch item');
      setLoading(false);
      return null;
    }
  };

  const addItem = async (item: Omit<T, 'id'>) => {
    setLoading(true);
    try {
      const itemWithTimestamp = {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, collectionName), itemWithTimestamp);
      setLoading(false);
      return { id: docRef.id, ...item } as T;
    } catch (err) {
      console.error('Error adding document:', err);
      setError('Failed to add item');
      setLoading(false);
      return null;
    }
  };

  const updateItem = async (id: string, updates: Partial<T>) => {
    setLoading(true);
    try {
      const itemWithTimestamp = {
        ...updates,
        updatedAt: serverTimestamp()
      };
      
      const docRef = doc(db, collectionName, id);
      await updateDoc(docRef, itemWithTimestamp);
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error updating document:', err);
      setError('Failed to update item');
      setLoading(false);
      return false;
    }
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, collectionName, id));
      setLoading(false);
      return true;
    } catch (err) {
      console.error('Error deleting document:', err);
      setError('Failed to delete item');
      setLoading(false);
      return false;
    }
  };

  return {
    items,
    loading,
    error,
    getItems,
    getItem,
    addItem,
    updateItem,
    deleteItem
  };
};