export default function ButtonForm ({ onClick, label, type = 'submit' }) {
  return (
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    type={type}
    onClick={onClick}
  >
    {label}
  </button>
  )
}
