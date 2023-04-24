import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { SignInButton } from '../components/SingInButton'
import { SignOutButton } from '../components/SingOutButton'
import { auth } from '../components/firebase/api'
import { useAuthState } from 'react-firebase-hooks/auth'
import { isMobile } from '../Sections/utils'

function NavBar ({ active }) {
  const [user] = useAuthState(auth)
  return (
    <Navbar bg="primary" variant="dark">
      <div className="img" style={{ padding: 20, marginLeft: 15 }} />
      <Nav className="me-auto">
        <Nav.Link
          className={active === 'inicio' ? 'active' : null}
          style={isMobile ? { marginLeft: 10 } : { marginLeft: 20, fontSize: '1.5rem' }}
          href="/"
        >
          Home
        </Nav.Link>
        <Nav.Link
          className={active === 'games' ? 'active' : null}
          href="/Games"
          style={isMobile ? null : { fontSize: '1.5rem' }}
        >
          Games
        </Nav.Link>
      </Nav>
      {user && !isMobile ? <h5 style={{ marginRight: 5, color: 'white' }}>Wellcome: {user.displayName}</h5> : null}
      {user ? <SignOutButton /> : <SignInButton />}
    </Navbar>
  )
}
export default NavBar
