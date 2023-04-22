import { firebaseSignOut } from './firebase/api'
import { Button } from 'react-bootstrap'

export const SignOutButton = () => {
  return <Button style={{ marginRight: 20 }} onClick={firebaseSignOut} variant="info">Sing Out</Button>
}
