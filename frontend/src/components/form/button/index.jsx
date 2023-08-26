import Button from 'react-bootstrap/Button';

export default function ButtonForm ({ onClick, label, type = 'submit' }) {
  return (
  <Button
    variant="primary"
    // className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    type={type}
    onClick={onClick}
  >
    {label}
  </Button>
  )
}
