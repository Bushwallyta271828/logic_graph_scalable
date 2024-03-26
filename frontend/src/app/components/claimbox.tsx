type ClaimBoxProps = {
  text: string;
};

export default function ClaimBox({text} : ClaimBoxProps) {
  return (
    <div className="flex shadow-xl">
      <div className="bg-slate-800 text-white w-20 p-4 rounded-l-md">
        <pre>9372</pre>
        <pre>Text Claim</pre>
        <pre>some_user</pre>
      </div>
      <div className="bg-indigo-950 text-white flex-1 p-4 rounded-r-md">
        <strong>Response:</strong>
        <pre>{text}</pre>
      </div>
    </div>
  );
}
