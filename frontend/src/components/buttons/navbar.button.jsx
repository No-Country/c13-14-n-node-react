import { Link } from 'react-router-dom'

export default function NavbarButton ({ label, to, color = 'bg-blue-500' }) {
  return (
   <Link
    className="text-white hover:text-blue-300"
    to={to}
    >
      {label}
    </Link>
  )
}
