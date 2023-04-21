import NavBar from '../Router/Nav'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'
import { Location } from './utils'

export default function Game () {
  const { state: item } = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <NavBar active='games'/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          style={{
            flex: 1,
            marginTop: 80,
            marginLeft: 10,
            marginRight: 10,
            maxWidth: 600,
            textAlign: 'center'
          }}
          key={item.date + item.time + item.location}
          bg={item.variant.toLowerCase()}
          text={item.variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        >
          <Card.Header>
            <Card.Title>{item.teams}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Title>Date: {item.date.replaceAll('_', '/')}</Card.Title>
            <Card.Text>Time: {item.time}</Card.Text>
            <Card.Text>Location: {item.location}</Card.Text>
            <Card.Text>{Location(item).description}</Card.Text>
            <Card.Text>
              <iframe className="iframe" src={Location(item).iframe}></iframe>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
        variant={item.variant.toLowerCase()}
          style={{
            marginTop: 50,
            marginBottom: 50,
            width: 100,
            textAlign: 'center'
          }}
          onClick={() => {
            navigate('/Games')
          }}
        >
          Back
        </Button>
      </div>
    </>
  )
}
