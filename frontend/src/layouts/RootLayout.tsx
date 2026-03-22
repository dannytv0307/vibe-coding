import { Outlet, Link } from 'react-router-dom'
import { NavBar } from '../components/NavBar'

export function RootLayout() {
  return (
    <>
      <NavBar>
        <Link to="/" className="font-bold text-lg">
          SUPPERCOOL
        </Link>
      </NavBar>
      <Outlet />
    </>
  )
}
