export default function OutlineButton ({ label, onClick, color = 'bg-blue-500' }) {
  return (
    <button
      onClick={onClick}
      className={'bg-transparent hover:bg-blue-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded'}
    >
      {label}
    </button>

  )
}
