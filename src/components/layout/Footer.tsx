import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import personalInfoData from '../../data/personalInfo.json';

interface PersonalInfo {
  name: string;
  contact: {
    email?: string;
    location?: string;
    social: {
      [key: string]: string | undefined;
    };
  };
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const personalInfo = personalInfoData as PersonalInfo;
  const { contact } = personalInfo;

  // Map social platform names to icons
  const socialIcons: { [key: string]: React.ReactNode } = {
    github: <Github size={20} />,
    linkedin: <Linkedin size={20} />,
  };

  const getIcon = (platform: string): React.ReactNode => {
    return socialIcons[platform.toLowerCase()] || null;
  };

  return (
    <footer className="bg-white dark:bg-gray-900 mt-auto py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            {contact.location && (
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1 flex items-center gap-1">
                <MapPin size={14} />
                {contact.location}
              </p>
            )}
          </div>

          <div className="flex space-x-4">
            {/* Social Links */}
            {contact.social && Object.entries(contact.social).map(([platform, url]) => {
              if (!url) return null;
              const icon = getIcon(platform);
              if (!icon) return null;
              
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  aria-label={`${platform} Profile`}
                  title={platform}
                >
                  {icon}
                </a>
              );
            })}

            {/* Email */}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                aria-label="Email Contact"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;