import { unstable_noStore as noStore } from 'next/cache';

export default async function CallAPI() {
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
    return new Response('BACKEND_ADDRESS undefined');
  } else {
    try {
      return fetch(process.env.BACKEND_ADDRESS, { cache: 'no-store' });
    } catch {
      return new Response('Unable to fetch');
    }
  }
}
