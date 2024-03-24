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

//export default async function Claimbox() {
//  let jsonData = null; // Initialize variable to store parsed data
//  
//  try {
//    const response = await fetch('http://backend/api', { cache: 'no-store' });
//    jsonData = await response.json(); // Parse JSON data
//  } catch (error) {
//    const errorMessage = (error as Error).message;
//    return (
//      <>
//        <div>Error loading data: {errorMessage}</div>
//      </>
//    );
//  }
//
//  return (
//    <div>{JSON.stringify(jsonData, null, 2)}</div> // Correctly display the JSON data
//  );
//}

export default async function Claimbox() {
  let responseText = ''; // Initialize variable to store raw response text
  let jsonParseError = ''; // Initialize variable to store JSON parse error message

  try {
    const response = await fetch('http://backend', { cache: 'no-store' });
    responseText = await response.text(); // Get the raw response text

    // Attempt to parse JSON to handle it if you want
    try {
      const jsonData = JSON.parse(responseText);
      // You can also directly embed jsonData in your return if it's valid
      responseText = JSON.stringify(jsonData, null, 2); // Beautify JSON string if needed
    } catch (parseError) {
      jsonParseError = (parseError instanceof Error) ? parseError.message : 'An unknown error occurred while parsing JSON';
    }
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
    return (
      <div>Error loading data: {errorMessage}</div>
    );
  }

  return (
    <div>
      {jsonParseError && (
        <div>
          <strong>JSON Parse Error:</strong>
          <pre>{jsonParseError}</pre>
        </div>
      )}
      <div>
        <strong>Response:</strong>
        <pre>{responseText}</pre>
      </div>
    </div>
  );
}
