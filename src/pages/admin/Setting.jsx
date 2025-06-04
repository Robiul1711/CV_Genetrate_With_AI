import React, { useState } from 'react'
import { FaUser, FaLock, FaCreditCard } from 'react-icons/fa'
import ProfileSetting from '@/components/AdminSettingComponents/ProfileSetting'
import ChangePassword from '@/components/AdminSettingComponents/ChangePassword'
import Subscription from '@/components/AdminSettingComponents/Subscription'

const Setting = () => {
  const [activeTab, setActiveTab] = useState('profile')

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSetting />
      case 'password':
        return <ChangePassword />
      case 'subscription':
        return <Subscription />
      default:
        return null
    }
  }

  return (
    <div className="h-[calc(100vh-200px)] overflow-hidden flex lg:gap-10">
      {/* Sidebar */}
      <div className="max-w-1/6 bg-[#0E0E10] p-2 sm:p-4 lg:p-6 rounded-xl h-full overflow-y-auto">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Profile"
            className="sm:w-12 size-8 sm:h-12 object-cover rounded-full"
          />
          <div>
            <h1 className="text-sm font-semibold text-white">John Doe</h1>
            <p className="text-xs text-[#9B9B9B]">Admin</p>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col gap-4 text-xs sm:text-base lg:gap-8 text-white">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 transition-colors ${
              activeTab === 'profile' ? 'text-green-400' : 'hover:text-green-400'
            }`}
          >
            <FaUser /> Profile Settings
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`flex items-center gap-2 transition-colors ${
              activeTab === 'password' ? 'text-green-400' : 'hover:text-green-400'
            }`}
          >
            <FaLock /> Change Password
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-2 transition-colors ${
              activeTab === 'subscription' ? 'text-green-400' : 'hover:text-green-400'
            }`}
          >
            <FaCreditCard /> Subscription
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className=" flex-1 h-full overflow-y-auto rounded-xl lg:p-4">
        {renderContent()}
      </div>
    </div>
  )
}

export default Setting
