import React, { useState } from 'react';
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/24/outline';

const Toggle = ({ enabled, onChange }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 ${
      enabled ? 'bg-blue-600' : 'bg-gray-600'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

const Settings = () => {
  const [publishToExplore, setPublishToExplore] = useState(true);
  const [improveModel, setImproveModel] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('System');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const themes = ['System', 'Light', 'Dark'];

  return (
    <div className="flex mt-10 ml-6  w-[150vh] h-[85vh] rounded-2xl bg-[#2d2d2d] text-white">
      {/* Sidebar */}
      <div className="w-64 rounded-tl-2xl rounded-bl-2xl bg-[#303030] p-4">
        <h1 className="text-xl font-semibold mb-6">Settings</h1>
        
        <nav className="space-y-2">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-500 rounded"></div>
              <span className="text-sm font-medium">General</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 bg-gray-600 rounded"></div>
              <span className="text-sm font-medium">My plan</span>
            </div>
            <span className="text-xs text-gray-500">Free</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold mb-8">General</h2>
        
        <div className="space-y-8 max-w-2xl">
          {/* Username */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">ijldsjf</span>
              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                <PencilIcon className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
            </div>
            <div>
              <span className="text-white">arsalanaikhana9@gmail.com</span>
            </div>
          </div>

          {/* Theme */}
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Theme
              </label>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <span className="text-white">{selectedTheme}</span>
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              </button>
              
              {showThemeDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded-lg shadow-lg border border-gray-600">
                  {themes.map((theme) => (
                    <button
                      key={theme}
                      onClick={() => {
                        setSelectedTheme(theme);
                        setShowThemeDropdown(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-white hover:bg-gray-600 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Publish to explore */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Publish to explore
                </label>
              </div>
              <Toggle enabled={publishToExplore} onChange={setPublishToExplore} />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Images and videos you create can be seen by others in the explore feeds. Turning off this setting does not unpublish images and videos already in the feed.
              </p>
              <p className="text-sm text-gray-500">
                Images and videos that are created using uploaded media will not be published.
              </p>
            </div>
          </div>

          {/* Improve the model for everyone */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Improve the model for everyone
                </label>
              </div>
              <Toggle enabled={improveModel} onChange={setImproveModel} />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-400">
                Allows your content to be used to train our models, which makes Sora better for you and everyone who uses it. We take steps to protect your privacy.{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  Learn more
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="fixed bottom-8 right-8">
          <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-lg hover:bg-gray-100 transition-colors">
            Done
          </button>
        </div>
      </div>

    </div>
  );
};

export default Settings;
