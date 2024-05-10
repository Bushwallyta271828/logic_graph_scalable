'use client';

import { useState } from 'react';
import { fetchWrapper } from '@/app/_lib/api';

export function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const response = await fetchWrapper<{username: string, password: string}>
      ({path: "users/", data: {username: username, password: password}});
    console.log("Success!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
