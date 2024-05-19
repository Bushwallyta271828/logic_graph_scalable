'use client';

import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export function PasswordInput({name, autocomplete}: {name: string, autocomplete: boolean}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative">
      <input
        type={passwordVisible ? 'text' : 'password'}
        className="w-full p-2 border rounded"
        placeholder="Enter your password"
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {passwordVisible ? <IoEyeOff size={24} /> : <IoEye size={24} />}
      </div>
    </div>
  );
}
