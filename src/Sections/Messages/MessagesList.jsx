import { Card } from 'react-bootstrap'
export const CommentList = ({ messages, user }) => {
  return messages.map((x) => (
    <Card bg="light" className="mt-1" key={x.date}>
      <Card.Header>From: {user.displayName}</Card.Header>
      <Card.Header>Date: {x.date}</Card.Header>
      <Card.Body>
        <Card.Text> {x.commentText} </Card.Text>
      </Card.Body>
    </Card>
  ))
}
