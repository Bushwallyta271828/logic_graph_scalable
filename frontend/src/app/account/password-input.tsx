'use client';

import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export function PasswordInput({name, autocomplete}: {name: string, autocomplete: boolean}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative w-80">
      <input
        type={passwordVisible ? 'text' : 'password'}
        className="w-full p-1 pr-8 bg-bright-neutral text-white rounded-md outline-none"
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {passwordVisible ? <IoEyeOff size={16} className="text-white" /> : <IoEye size={16} className="text-white" />}
      </div>
    </div>
  );
}
