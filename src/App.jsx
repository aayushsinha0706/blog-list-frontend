import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Loginform from './components/Loginform'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'
import Blogform from './components/BlogForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //New Blog form state variables
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  },[])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if ( loggedUser ){
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    const createdBlog = await blogService.addBlog(newBlog)
    setBlogs(blogs.concat(createdBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      {
        user===null
          ? <Loginform 
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword} 
          />
          : <div>
              <h2>Blogs</h2>
              <div>
                {user.name} is logged in
                {' '}<button onClick={handleLogout}>logout</button>
              </div>
              <div>
                <Blogform
                  onSubmit={addBlog}
                  title={title}
                  setTitle={setTitle}
                  author={author}
                  setAuthor={setAuthor}
                  url={url}
                  setUrl={setUrl}  
                />
              </div>
              {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
              ))}
            </div>
      }
    </div>

  )
}

export default App