'use client';

//import { useState } from 'react';
//import { post } from '@/app/_lib/api';

//export function LoginForm() {
//  const [username, setUsername] = useState('');
//  const [password, setPassword] = useState('');
//
//  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//    event.preventDefault();
//    const response = await post<{username: string, password: string}>
//      ({path: "users/", data: {username: username, password: password}});
//    console.log("Success!");
//  };
//
//  return (
//    <form onSubmit={handleSubmit}>
//      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
//      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
//      <button type="submit">Login</button>
//    </form>
//  );
//  //return (<></>);
//}



export function LoginForm({handleSubmit}: {handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void}) {
//  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//    event.preventDefault();
//
//    const formData = new FormData(event.currentTarget);
//    const username = formData.get('username'); // Get the username from the form
//    const password = formData.get('password'); // Get the password from the form
//
//    console.log('Username:', username);
//    console.log('Password:', password);
//
//  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
