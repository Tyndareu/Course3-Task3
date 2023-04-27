import { Card, Button } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, deleteOneDoc } from '../../components/firebase/api'

export const CommentList = ({ messages }) => {
  const [userLogin] = useAuthState(auth)

  return messages.map(({ name, mail, date, commentText, id, isNew }) => (
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
          onClick={async () => {
            try {
              deleteOneDoc(id)
            } catch (error) {
              alert(error)
            }
            setTimeout(() => {
              window.location.reload(true)
            }, 3000)
          }}
          variant="danger"
          style={{ margin: 'auto', marginTop: 2, marginBottom: 2, width: 140 }}
        >
          {isNew ? 'Reload for delete' : 'Delete'}
        </Button>
          )}
    </Card>
  ))
}
