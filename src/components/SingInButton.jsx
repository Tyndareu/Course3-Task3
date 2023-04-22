import { signInWithGoogle } from './firebase/api'
import { Button } from 'react-bootstrap'

export const SignInButton = () => {
  return <Button style={{ marginRight: 20 }} onClick={signInWithGoogle} variant="warning">Sing In</Button>
}
