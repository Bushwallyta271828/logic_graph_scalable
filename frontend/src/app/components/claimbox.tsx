"use server";
//export default async function Claimbox() {
//  try{
//    const data = await fetch(process.env.API_LOCATION || 'http://localhost:3000');
//  } catch (TypeError) {
//    console.log("invalid fetch attempt");
//  }
//  return (
//    <div>JSON.stringify(data, null, 2)</div>
//  );
//}
//

export default async function Claimbox() {
  let jsonData = null; // Initialize variable to store parsed data
  
  try {
    const response = await fetch('http://backend/api', { cache: 'no-store' });
    jsonData = await response.json(); // Parse JSON data
  } catch (error) {
    const errorMessage = (error as Error).message;
    return (
      <>
        <div>Error loading data: {errorMessage}</div>
      </>
    );
  }

  return (
    <div>{JSON.stringify(jsonData, null, 2)}</div> // Correctly display the JSON data
  );
}
