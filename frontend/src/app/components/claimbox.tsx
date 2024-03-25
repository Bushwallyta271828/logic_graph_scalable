import { unstable_noStore as noStore } from 'next/cache';

export default async function Claimbox() {
  noStore();
  let responseText = ''; // Initialize variable to store raw response text

  try {
    if (typeof process.env.BACKEND_ADDRESS === 'undefined') {
      throw new Error("BACKEND_ADDRESS has type 'undefined'");
    } else {
      const response = await fetch(process.env.BACKEND_ADDRESS, { cache: 'no-store' });
      responseText = await response.text();
    }
  } catch (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <strong>Response:</strong>
      <pre>{responseText}</pre>
    </div>
  );
}
