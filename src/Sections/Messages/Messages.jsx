import { Form, Button, Card } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, newOneDoc, getAllDocs } from '../../components/firebase/api'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { CommentList } from './MessagesList'

export const Messages = ({ game }) => {
  const [user] = useAuthState(auth)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const readBD = async () => {
    const docs = []
    const querySnapshot = await getAllDocs()
    querySnapshot.forEach((doc) => {
      docs.push({ ...doc.data(), id: doc.id })
    })
    setMessages(
      docs.filter((x) => x.idgame === game.id).sort((x, y) => x.date - y.date)
    )
  }
  useEffect(() => {
    readBD()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const commentBD = {
      date: new Date().toUTCString(),
      idgame: game.id,
      iduser: user.uid,
      commentText: message,
      mail: user.email,
      name: user.displayName
    }
    await newOneDoc(commentBD)
    const commentBDisNew = {
      date: new Date().toUTCString(),
      idgame: game.id,
      iduser: user.uid,
      commentText: message,
      mail: user.email,
      name: user.displayName,
      isNew: true
    }
    const addNewComment = messages
    addNewComment.push(commentBDisNew)
    setMessage('')
    toast.success('Mesagge Send!', {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      photos: []
    })
  }
  return (
    <div className="comments">
      <Form>
        <Form.Group className="mb-1">
          <Form.Control
            onChange={(event) => {
              setMessage(event.target.value)
            }}
            value={message}
            className="legend"
            placeholder="New message"
            as="textarea"
            rows={3}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleSubmit}
            className="legend mb-3 mt-1"
            variant={game.variant}
            type="submit"
            value="Submit"
            disabled={message === ''}
          >
            Submit
          </Button>
        </div>
      </Form>
      {messages.length === 0
        ? (
        <Card bg="light">
          {' '}
          <Card.Header>No messages Yet! Be the first</Card.Header>{' '}
        </Card>
          )
        : (
        <CommentList messages={messages} user={user} />
          )}
      <ToastContainer />
    </div>
  )
}
