import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

function NavBar ({ active }) {
  return (
    <Navbar bg="primary" variant="dark">
      <img
        style={{ maxHeight: 40, marginLeft: 20 }}
        id="logo"
        src="../src/img/nysl_logo.png"
        alt="Northside Youth Soccer League Logo"
      />
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
    </Navbar>
  )
}
export default NavBar
