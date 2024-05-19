'use client';

import { useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';

export function UsernameInput({name, autocomplete}: {name: string, autocomplete: boolean}) {
  return (
    <input
      type="text"
      id={name}
      name={name}
      autoComplete={autocomplete? 'username' : 'off'}
      required
      className="w-full p-2 bg-medium-neutral focus:bg-bright-neutral text-white text-sm rounded-md outline-none"
    />
  );
}

export function PasswordInput({name, autocomplete}: {name: string, autocomplete: boolean}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-full">
      <input
        type={passwordVisible ? 'text' : 'password'}
        id={name}
        name={name}
        autoComplete={autocomplete ? 'current-password' : 'new-password'}
        required
        className="w-full p-2 pr-8 bg-medium-neutral focus:bg-bright-neutral text-white text-sm rounded-md outline-none"
      />
      <div
        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
        onClick={() => setPasswordVisible(!passwordVisible)}
      >
        {passwordVisible ?
          <IoEyeOff size={16} className="text-white" /> :
          <IoEye size={16} className="text-white" />
        }
      </div>
    </div>
  );
}
