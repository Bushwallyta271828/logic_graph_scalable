type ClaimBoxProps = {
  text: string;
};

export default function ClaimBox({text} : ClaimBoxProps) {
  return (
    <div className="bg-blue-200 text-black max-w-xl mx-auto px-4 py-2 rounded-full shadow-md">
      <strong>Response:</strong>
      <pre>{text}</pre>
    </div>
  );
}
