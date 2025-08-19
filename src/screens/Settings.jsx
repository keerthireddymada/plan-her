import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Lock, Palette, HelpCircle, Info, LogOut, ChevronRight } from 'lucide-react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('dark');

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Information', action: 'navigate' },
        { icon: Bell, label: 'Notifications', action: 'toggle', state: notifications, setState: setNotifications },
        { icon: Lock, label: 'Privacy & Security', action: 'navigate' },
      ]
    },
    {
      title: 'Preferences',
      items: [
        { icon: Palette, label: 'Theme', action: 'select', state: theme, setState: setTheme, options: ['light', 'dark', 'auto'] },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', action: 'navigate' },
        { icon: Info, label: 'About PlanHer', action: 'navigate' },
      ]
    },
    {
      title: 'Account Actions',
      items: [
        { icon: LogOut, label: 'Sign Out', action: 'logout', dangerous: true },
      ]
    }
  ];

  const handleAction = (item) => {
    if (item.action === 'toggle') {
      item.setState(!item.state);
    } else if (item.action === 'logout') {
      console.log('Logout');
    } else {
      console.log('Navigate to:', item.label);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="pb-20 px-6 pt-12 bg-black-950 min-h-screen"
    >
      {/* Header */}
      <div className="mb-8">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2"
        >
          Settings
        </motion.h1>
        <p className="text-black-400">Customize your PlanHer experience</p>
      </div>

      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-lavender-600 rounded-2xl p-6 mb-8 text-white shadow-glow"
      >
        <div className="flex items-center">
          <div className="w-16 h-16 bg-black-900 rounded-full flex items-center justify-center text-2xl mr-4">
            👤
          </div>
          <div>
            <h3 className="text-xl font-semibold">Sarah Johnson</h3>
            <p className="text-lavender-100">sarah.johnson@email.com</p>
            <p className="text-sm text-lavender-200 mt-1">Member since Jan 2024</p>
          </div>
        </div>
      </motion.div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + sectionIndex * 0.1 }}
            className="bg-black-900 rounded-2xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-black-800">
              <h3 className="text-lg font-semibold text-white">{section.title}</h3>
            </div>
            
            <div className="divide-y divide-black-800">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                    onClick={() => handleAction(item)}
                    className={`flex items-center justify-between p-6 cursor-pointer hover:bg-black-800 transition-colors ${
                      item.dangerous ? 'hover:bg-red-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <Icon 
                        size={20} 
                        className={`mr-4 ${
                          item.dangerous ? 'text-red-400' : 'text-lavender-400'
                        }`} 
                      />
                      <span className={`font-medium ${
                        item.dangerous ? 'text-red-400' : 'text-white'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                    
                    <div className="flex items-center">
                      {item.action === 'toggle' && (
                        <div 
                          className={`w-12 h-6 rounded-full transition-colors ${
                            item.state ? 'bg-lavender-500' : 'bg-black-700'
                          }`}
                        >
                          <div 
                            className={`w-5 h-5 bg-white rounded-full transition-transform ${
                              item.state ? 'translate-x-6' : 'translate-x-0.5'
                            } mt-0.5`}
                          />
                        </div>
                      )}
                      
                      {item.action === 'select' && (
                        <div className="flex items-center">
                          <span className="text-sm text-black-400 mr-2 capitalize">{item.state}</span>
                          <ChevronRight size={16} className="text-black-400" />
                        </div>
                      )}
                      
                      {(item.action === 'navigate' || item.action === 'logout') && (
                        <ChevronRight 
                          size={16} 
                          className={item.dangerous ? 'text-red-400' : 'text-black-400'} 
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* App Version */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-8 mb-4"
      >
        <p className="text-sm text-black-400">PlanHer v1.2.0</p>
        <p className="text-xs text-black-500 mt-1">Made with 💜 for women's wellness</p>
      </motion.div>
    </motion.div>
  );
};

export default Settings;
