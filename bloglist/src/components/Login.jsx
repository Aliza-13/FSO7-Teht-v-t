
import { Form, Input, Button } from './StyledComponents'

const LoginForm = ({
   handleSubmit,
   handleUsernameChange,
   handlePasswordChange,
   username,
   password
  }) => {
  return (
    <div>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <div>
          username
          <Input
            data-testid="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>

        <div>
          password
          <Input
            data-testid="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
      </div>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )
}

export default LoginForm