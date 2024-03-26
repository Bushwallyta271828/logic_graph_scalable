type ClaimBoxProps = {
  text: string;
};

export default function ClaimBox({text} : ClaimBoxProps) {
  return (
    <div className="bg-slate-800 text-white max-w-xl mx-auto px-4 py-2 rounded-md shadow-md">
      <strong>Response:</strong>
      <pre>{text}</pre>
    </div>
  );
}
