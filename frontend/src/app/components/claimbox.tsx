export default async function Claimbox() {
  let responseText = ''; // Initialize variable to store raw response text

  try {
    const response = await fetch('http://backend', { cache: 'no-store' });
    responseText = await response.text();
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
