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
    const response = await fetch(process.env.API_LOCATION || 'http://localhost:3000');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    jsonData = await response.json(); // Parse JSON data
  } catch (error) {
    return <div>Error loading data</div>; // Render error message
  }

  return (
    <div>{JSON.stringify(jsonData, null, 2)}</div> // Correctly display the JSON data
  );
}
