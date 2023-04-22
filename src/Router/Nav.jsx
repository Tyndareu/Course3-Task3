import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { SignInButton } from '../components/SingInButton'
import { SignOutButton } from '../components/SingOutButton'
import { auth } from '../components/firebase/api'
import { useAuthState } from 'react-firebase-hooks/auth'

function NavBar ({ active }) {
  const [user] = useAuthState(auth)
  return (
    <Navbar bg="primary" variant="dark">
      <div className="img" style={{ padding: 20, marginLeft: 15 }} />
      <Nav className="me-auto">
        <Nav.Link
          className={active === 'inicio' ? 'active' : null}
          style={{ marginLeft: 20 }}
          href="/"
        >
          Home
        </Nav.Link>
        <Nav.Link
          className={active === 'games' ? 'active' : null}
          href="/Games"
        >
          Games
        </Nav.Link>
      </Nav>
      {user ? <SignOutButton /> : <SignInButton />}
    </Navbar>
  )
}
export default NavBar
