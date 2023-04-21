import Nav from '../Router/Nav'
import { Card } from 'react-bootstrap'
import events from '../Json/events.json'
const variant = 'Primary'

const Home = () => {
  return (
    <>
      <Nav />
      <div style={{ padding: 20, color: 'white' }}>
        <div className="logoH1">
          <img
            style={{ maxHeight: 80 }}
            id="logo"
            src="../src/img/nysl_logo.png"
            alt="Northside Youth Soccer League Logo"
          />
          <h1>Northside Youth Soccer League</h1>
        </div>
        <div id="title-bar" className="mt-3">
          <h2>Upcoming Events</h2>
        </div>
        <div className="events-list">
          {events.map((item) => (
            <Card
              key={item.date + item.type}
              bg={variant.toLowerCase()}
              text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
              style={{ width: '18rem' }}
              className="mb-2"
            >
              <Card.Header>{item.date}</Card.Header>
              <Card.Body>
                <Card.Title>{item.type}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
export default Home
