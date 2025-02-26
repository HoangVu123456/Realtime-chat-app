import React, { useEffect, useState } from 'react';
import { useChatstore } from '../store/useChatstore';
import SidebarSkeleton from './Skeleton/SidebarSkeleton';
import { Users } from 'lucide-react';
import { useAuthstore } from '../store/useAuthstore';

const Sidebar = () => {

    const { users, getuser, selecteduser, setselecteduser, isuserloading} = useChatstore();

    const { onlineuser } = useAuthstore();

    const [showonlineuser, setshowonlineuser] = useState(false);

    useEffect(() => {getuser()}, [getuser]);

    const filteruser = showonlineuser? users.filter((user) => onlineuser.includes(user._id)): users;

    if (isuserloading) return <SidebarSkeleton/>
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
        <div className="border-b border-base-300 w-full p-5">
            <div className="flex items-center gap-2">
                <Users className="size-6"/>
                <span className="font-medium hidden lg:block">Contacts</span>
            </div>

            {/*Online filter*/}
            <div className="mt-3 hidden lg:flex items-center gap-2">
              <label className="cursor-pointer flex items-center gap-2">
                <input
                type="checkbox"
                checked={showonlineuser}
                onChange={(e) => setshowonlineuser(e.target.checked)}
                className="checkbox checkbox-sm"
                />
                <span className="text-sm">Show online only</span>
              </label>
                <span className="text-xs text-zinc-500">({onlineuser.length - 1} online)</span>
            </div>
            <div className="overflow-y-auto w-full py-3">
        {filteruser.map((user) => (
          <button
            key={user._id}
            onClick={() => setselecteduser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selecteduser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilepic || "/avatar.png"}
                alt={user.username}
                className="size-12 object-cover rounded-full"
              />
              {onlineuser.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullname}</div>
              <div className="text-sm text-zinc-400">
                {onlineuser.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}
      </div>
        </div>
    </aside>
  );
};

export default Sidebar;