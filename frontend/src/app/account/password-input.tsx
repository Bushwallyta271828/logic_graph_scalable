'use client';

import { IoEye, IoEyeOff } from "react-icons/io5";

export function PasswordInput({name, autocomplete}: {name: string, autocomplete: boolean}) {
  return (
    <>
      <input
        type="password"
        id={name}
        name={name}
        autoComplete={autocomplete ? "current-password" : "new-password"}
        required
      />
      <IoEye />
      <IoEyeOff />
    </>
  );
}
