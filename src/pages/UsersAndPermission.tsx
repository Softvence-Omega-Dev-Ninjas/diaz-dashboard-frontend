import React, { useState } from 'react';
import { Plus, MoreVertical } from 'lucide-react';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  initials: string;
  role: string;
  color: string;
}

const DEMO_ADMIN_USERS: AdminUser[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@fyt.com',
    initials: 'JD',
    role: 'Super Admin',
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@fyt.com',
    initials: 'JS',
    role: 'Moderator',
    color: 'bg-blue-500',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@fyt.com',
    initials: 'BJ',
    role: 'Content Manager',
    color: 'bg-blue-500',
  },
];

const UsersAndPermission: React.FC = () => {
  const [adminUsers] = useState<AdminUser[]>(DEMO_ADMIN_USERS);

  const handleAddAdmin = () => {
    console.log('Adding new admin...');
  };

  const handleUserOptions = (id: number) => {
    console.log('User options for:', id);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Users & Permissions
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage admin users and access control
        </p>
      </div>

      {/* Admin Users Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 border-b border-gray-200 gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Admin Users</h2>
          <button
            onClick={handleAddAdmin}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors w-full sm:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Add Admin
          </button>
        </div>

        {/* Users List */}
        <div className="divide-y divide-gray-200">
          {adminUsers.map((user) => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors gap-4"
            >
              {/* User Info */}
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                {/* Avatar */}
                <div
                  className={`${user.color} w-12 h-12 rounded-full flex items-center justify-center shrink-0`}
                >
                  <span className="text-white text-sm font-semibold">
                    {user.initials}
                  </span>
                </div>

                {/* Name and Email */}
                <div className="min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5 truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Role and Actions */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* Role Badge */}
                <span className="px-3 py-1.5 bg-black text-white text-xs font-medium rounded-lg whitespace-nowrap">
                  {user.role}
                </span>

                {/* More Options Button */}
                <button
                  onClick={() => handleUserOptions(user.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ml-auto"
                  aria-label="More options"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersAndPermission;
