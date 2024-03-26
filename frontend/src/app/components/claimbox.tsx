type ClaimBoxProps = {
  text: string;
};

export default function ClaimBox({text} : ClaimBoxProps) {
  return (
    <div className="flex">
      <div className="bg-blue-500 text-white w-8 p-4 rounded-l-md">
        <pre>Hi!</pre>
      </div>
      <div className="bg-indigo-900 text-white flex-1 p-4 rounded-r-md border border-gray-200">
        <strong>Response:</strong>
        <pre>{text}</pre>
      </div>
    </div>
  );

//
//
//
//    <div className="bg-indigo-950 text-white max-w-xl mx-auto px-4 py-2 rounded-md shadow-md">
//      <strong>Response:</strong>
//      <pre>{text}</pre>
//    </div>
//  );
}
