'use client';
import { Session } from '@supabase/supabase-js';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase/client';

const handleSignOut = async () => {
  await supabase.auth.signOut();
  window.location.reload();
};

export function LoggedInProfile({
  session,
  size = 'md',
}: {
  session: Session;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const name =
    session.user.user_metadata.full_name || session.user.user_metadata.name || session.user.email;

  const initial = name?.charAt(0)?.toUpperCase() || '?';

  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-14 h-14 text-xl',
    xl: 'w-20 h-20 text-3xl',
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="absolute right-8" ref={dropdownRef}>
      <button
        className={`flex items-center justify-center rounded-full bg-blue-500 text-white font-light ${sizes[size]}`}
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {initial}
      </button>

      {showDropdown && (
        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-20 bg-white text-black shadow-lg rounded-lg py-2 z-50">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button>
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100" onClick={handleSignOut}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
