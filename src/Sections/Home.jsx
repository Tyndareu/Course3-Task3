import NavBar from '../Router/Nav'
import { Card } from 'react-bootstrap'
import events from '../Json/events.json'
const variant = 'Primary'

const Home = () => {
  return (
    <>
      <NavBar active='inicio' />
      <div style={{ padding: 20, color: 'white' }}>
        <div className="logoH1">
        <div className='img' style={{ padding: 40 }} />
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
              className="cardHome"
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
