import React, { useContext, useState } from 'react';
import { ChevronDownIcon, PencilIcon } from '@heroicons/react/24/outline';
import { FlashContext } from '../../Context/FlashCardsContext';
import UserNameModal from './UserNameModal';
import { SettingOutlined } from "@ant-design/icons";
import ConfirmationNumberTwoToneIcon from "@mui/icons-material/ConfirmationNumberTwoTone";

const Settings = () => {
  const [selectedTheme, setSelectedTheme] = useState('System');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const themes = ['System', 'Light', 'Dark'];

  const {userfetch} = useContext(FlashContext)

  return (
    <div className="flex w-[150vh] h-[85vh] rounded-2xl bg-[#2d2d2d] text-white">
      {/* Sidebar */}
      <div className="w-64 rounded-tl-2xl rounded-bl-2xl bg-[#303030] p-4">
        <h1 className="text-xl font-semibold mb-6">Settings</h1>
        
        <nav className="space-y-2">
          <div className="flex items-center justify-between px-3 py-2 bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="h-5">
                <SettingOutlined style={{fontSize:15}}/>
              </div>
              <span className="text-sm font-medium">General</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between px-3 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
            <div className="flex items-center space-x-3">
              <div className="h-5 ">
                <ConfirmationNumberTwoToneIcon style={{fontSize:20}}/>
              </div>
              <span className="text-sm font-medium">My plan</span>
            </div>
            <span className="text-xs text-gray-500">Free</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold border-b border-[#444442] py-3">General</h2>
        
        <div className="space-y-1 max-w-2xl">
          {/* Username */}
          <div className="border-[#444442] flex items-center justify-between border-b py-2">
            <div>
              <label className="block text-sm font-medium  text-gray-300 mb-1">
                Username
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-white">{userfetch.displayName}</span>
              <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                <UserNameModal/>
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="border-[#444442] flex items-center justify-between border-b py-2">
            <div>
              <label className="block text-sm font-medium  text-gray-300 mb-1">
                Email
              </label>
            </div>
            <div>
              <span className="text-white">{userfetch.email}</span>
            </div>
          </div>

          {/* Theme */}
          <div className="flex items-center border-b border-[#444442] py-2 justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Theme
              </label>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="flex items-center "
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

        
        </div>

        {/* Done Button */}
        <div className="relative h-65  ">
  <div className="absolute bottom-0 right-0">
    <button className="px-6 py-2 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-colors">
      Done
    </button>
  </div>
</div>

      </div>

    </div>
  );
};

export default Settings;
