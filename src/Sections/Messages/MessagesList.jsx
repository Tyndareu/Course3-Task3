import { Card, Button } from 'react-bootstrap'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, deleteComment } from '../../components/firebase/api'

export const CommentList = ({ messages, user }) => {
  const [userLogin] = useAuthState(auth)
  return messages.map(({ date, commentText, id }) => (
    <Card bg="light" className="mt-1" key={date}>
      <Card.Header>From: {user.displayName}</Card.Header>
      <Card.Body>
        <Card.Text> {commentText} </Card.Text>
      </Card.Body>
      <Card.Header>Date: {date}</Card.Header>
      {userLogin.displayName !== user.displayName
        ? null
        : (
        <Button
          onClick={() => {
            deleteComment(id)
            window.location.reload(true)
          }
          }
          variant="danger"
          style={{ margin: 'auto', marginTop: 2, marginBottom: 2, width: 100 }}
        >
          Delete
        </Button>
          )}
    </Card>
  ))
}
