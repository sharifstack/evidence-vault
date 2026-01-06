export default function StatusChip({ status }) {
  const isActive = status === "Active";

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
      }`}
    >
      {status}
    </span>
  );
}
