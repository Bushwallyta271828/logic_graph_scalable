import { unstable_noStore as noStore } from 'next/cache';

export default async function CallAPI() {
  noStore(); //Don't store process.env.BACKEND_ADDRESS.
  try {
    if (typeof process.env.BACKEND_ADDRESS !== 'undefined') {
      return fetch(process.env.BACKEND_ADDRESS, { cache: 'no-store' });
    }
  } catch {
    return new Response('Unable to fetch');
  }
}
