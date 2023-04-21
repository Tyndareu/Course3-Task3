import NavBar from '../Router/Nav'
import {
  Card,
  DropdownButton,
  Dropdown,
  Form,
  ListGroup
} from 'react-bootstrap'
import { FilterMonths, Months, AllDates } from './utils'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const variant = 'Primary'
export default function Games () {
  const [monthFilter, setMonthFilter] = useState('All Months')
  const [dayFilter, setDayFilter] = useState('All Days')
  const [teams, setTeams] = useState([])
  const navigate = useNavigate()

  const handleMonthFilter = (e) => {
    setMonthFilter(e.target.id)
    setDayFilter('All Days')
  }
  const handleDayFilter = (e) => {
    setDayFilter(e.target.id)
  }
  const Checked = (e) => {
    if (e.target.checked) {
      setTeams([...teams, e.target.value])
    } else {
      setTeams(teams.filter((x) => x !== e.target.value))
    }
  }

  return (
    <>
      <NavBar active="games" />
      <div style={{ padding: 20, color: 'white' }}>
        <div className="logoH1">
          <div className="img" style={{ padding: 40 }} />
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

        <Form style={{ display: 'flex', margin: 10 }}>
          <Form.Check value="U1" onChange={Checked} type="switch" />
          <h5 style={{ marginRight: 20 }}>U1</h5>
          <Form.Check value="U2" onChange={Checked} type="switch" />
          <h5 style={{ marginRight: 20 }}>U2</h5>
          <Form.Check value="U3" onChange={Checked} type="switch" />
          <h5 style={{ marginRight: 20 }}>U3</h5>
        </Form>
        <Form style={{ display: 'flex', margin: 10 }}>
          <Form.Check value="U4" onChange={Checked} type="switch" />
          <h5 style={{ marginRight: 20 }}>U4</h5>
          <Form.Check value="U5" onChange={Checked} type="switch" />
          <h5 style={{ marginRight: 20 }}>U5</h5>
          <Form.Check value="U6" onChange={Checked} type="switch" />
          <h5 style={{ marginRight: 20 }}>U6</h5>
        </Form>
        <ListGroup horizontal style={{ marginLeft: 11, marginBottom: 10 }}>
          <ListGroup.Item
            className="legend"
            style={{ background: '#0D6EFD', color: 'white' }}
          >
            First Game
          </ListGroup.Item>
          <ListGroup.Item
            className="legend"
            style={{ background: '#198754', color: 'white' }}
          >
            Second Game
          </ListGroup.Item>
          <ListGroup.Item
          variant="info"
            className="legend"
          >
            Double click to see details
          </ListGroup.Item>
        </ListGroup>
        {!FilterMonths(monthFilter, dayFilter, teams)[0]
          ? (
          <h3 style={{ marginTop: 20 }}>
            There are currently no results for this search
          </h3>
            )
          : null}
        <div className="events-list">
          {FilterMonths(monthFilter, dayFilter, teams).map((item) => (
            <div key={item.date + item.time + item.location}>
              <Card
                key={item.date + item.time + item.location}
                bg={item.variant}
                text={variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2 cardGames"
                onDoubleClick={() => navigate('/Game', { state: item })}
              >
                <Card.Header
                  style={{ cursor: 'pointer' }}
                  onGotPointerCapture={() => navigate('/Game', { state: item })}
                >
                  <Card.Title style={{ textAlign: 'center' }}>
                    {item.teams}
                  </Card.Title>
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
