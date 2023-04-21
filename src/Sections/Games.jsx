import Nav from '../Router/Nav'
import { Card, DropdownButton, ListGroup } from 'react-bootstrap'
import { FilterMonths, Months, AllDates } from './utils'
import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const variant = 'Primary'

export default function Games () {
  const [monthFilter, setMonthFilter] = useState('All Months')
  const [dayFilter, setDayFilter] = useState('All Days')
  const navigate = useNavigate()

  const handleMonthFilter = (e) => {
    setMonthFilter(e.target.id)
    setDayFilter('All Days')
  }
  const handleDayFilter = (e) => {
    setDayFilter(e.target.id)
  }
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
        <h2 className="mt-3">Fall Schedule</h2>
        <div style={{ display: 'flex' }}>
          <DropdownButton
            style={{ margin: 5 }}
            id="dropdown-basic-button"
            title={'Month: ' + monthFilter}
          >
            {Months().map((item) => (
              <Dropdown.Item id={item} onClick={handleMonthFilter} key={item}>
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <DropdownButton
            style={{ margin: 5 }}
            id="dropdown-basic-button"
            title={'Day: ' + dayFilter}
          >
            {AllDates(monthFilter).map((item) => (
              <Dropdown.Item id={item} onClick={handleDayFilter} key={item}>
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>

        </div>
        <ListGroup horizontal style={{ margin: 5 }}>
            <ListGroup.Item style={{ background: '#0D6EFD', color: 'white' }}>First Game</ListGroup.Item>
            <ListGroup.Item style={{ background: '#198754', color: 'white' }}>Second Game</ListGroup.Item>
          </ListGroup>
        <div className="events-list">
          {FilterMonths(monthFilter, dayFilter).map((item) => (
            <div key={item.date + item.time + item.location}>
              <Card
                key={item.date + item.time + item.location}
                bg={item.variant}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2 card"
                onDoubleClick={() => navigate('/Game', { state: item })}
              >
                <Card.Header>
                  <Card.Title>{item.teams}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Title> {item.date.replaceAll('_', '/')} </Card.Title>
                  <Card.Text>
                    Time: <strong>{item.time}</strong>
                  </Card.Text>
                  <Card.Text>
                    Location:
                    <br /> <strong>{item.location}</strong>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
