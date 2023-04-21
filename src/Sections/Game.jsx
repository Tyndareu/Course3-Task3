import Nav from '../Router/Nav'
import { useLocation } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

const variant = 'Primary'
export default function Game () {
  const { state: item } = useLocation()
  return (
    <>
      <Nav />
      <Card
        key={item.date + item.time + item.location}
        bg={variant.toLowerCase()}
        text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
        className="mb-2 card"
      >
        <Card.Header>
          <Card.Title>{item.teams}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Card.Title>Date: {item.date.replaceAll('_', '/')}</Card.Title>
          <Card.Text>Time: {item.time}</Card.Text>
          <Card.Text>Location: {item.location}</Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
