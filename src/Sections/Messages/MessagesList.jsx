import { Card, Button } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, deleteOneDoc } from '../../components/firebase/api'
import { useState } from 'react'

export const CommentList = ({ messages }) => {
  const [allMessages, setAllMessages] = useState(messages)
  const [userLogin] = useAuthState(auth)

  const deleteMessage = (id) => {
    for (let index = 0; index < allMessages.length; index++) {
      if (messages[index].id === id) {
        messages.splice(index, 1)
      }
    }
    setAllMessages(messages)
    window.location.reload(true)
  }
  return allMessages.map(({ name, mail, date, commentText, id, isNew }) => (
    <Card bg="light" className="mt-1" key={date}>
      <Card.Header>From: {name}</Card.Header>
      <Card.Body>
        <Card.Text> {commentText} </Card.Text>
      </Card.Body>
      <Card.Header>Date: {date}</Card.Header>
      {userLogin.email !== mail
        ? null
        : (
        <Button
        disabled={isNew}
          onClick={() => {
            deleteOneDoc(id)
            deleteMessage(id)
          }}
          variant="danger"
          style={{ margin: 'auto', marginTop: 2, marginBottom: 2, width: 140 }}
        >
          {isNew ? 'Reload for delete' : 'Delete' }
        </Button>
          )}
    </Card>
  ))
}
