type ClaimBoxProps = {
  text: string;
};

export default function ClaimBox({text} : ClaimBoxProps) {
  return (
    <div draggable="true" className="flex shadow-xl">
      <div className="bg-slate-800 text-white w-30 p-2 rounded-l-md text-ellipsis text-sm">
        <p>9372</p>
        <p>some_user</p>
      </div>
      <div className="bg-slate-900 text-white flex-1 p-2 rounded-r-md text-wrap text-sm">
        <p>{text}{text}{text}{text}{text}</p>
      </div>
    </div>
  );
}
