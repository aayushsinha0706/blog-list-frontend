import { useState, useEffect } from 'react'

import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  if (user === null){
    return(
      <form onSubmit={handleLogin}>
      <h2>log in to the application</h2>
      <div>
        username
        <input
          name="username"
          type="text"
          value={username}
          onChange={({target}) => setUsername(target.value)} 
        />
      </div>
      <div>
        password
        <input 
          name="password"
          type="password"
          value={password}
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} is logged in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App