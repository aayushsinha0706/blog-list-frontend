import { useState } from 'react'
import PropTypes from 'prop-types'

const Loginform = ({
  loginFunc
}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    loginFunc({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            name="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            data-testid='username'
          />
        </div>
        <div>
          password
          <input
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            data-testid='password'
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

Loginform.propTypes = {
  loginFunc: PropTypes.func.isRequired
}

export default Loginform