'use client';

export function PasswordInput({name, autocomplete}: {name: string, autocomplete: boolean}) {
  return (
    <input
      type="password"
      id={name}
      name={name}
      autoComplete={(autocomplete === true) ? "current-password" : "new-password"}
      required
    />
  );
}
