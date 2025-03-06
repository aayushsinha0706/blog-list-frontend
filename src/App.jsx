import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Loginform from './components/Loginform'
import Blogform from './components/Blogform'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  //blog content state variable
  const [blogs, setBlogs] = useState([])

  //login state variables
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  //New Blog form state variables
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // Notification messages state variables
  const [notification, setNotification] = useState(null)
  const [category, setCategory] = useState('')

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
      setCategory('error')
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
    if (createdBlog){
      setBlogs(blogs.concat(createdBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      setCategory('add')
      setNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} has been added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      {
        user===null

          ? <div>
              <h2>log in to the application</h2>
              <Notification 
                message={notification} 
                category={category} 
              />
              <Togglable buttonLabel='log in'>
                <Loginform 
                  handleLogin={handleLogin}
                  username={username}
                  setUsername={setUsername}
                  password={password}
                  setPassword={setPassword} 
                  category={category}
                  notification={notification} 
                />
              </Togglable>
          </div>

          : <div>
              <h2>Blogs</h2>
              <Notification 
                message={notification} 
                category={category} 
              />
              <div>
                {user.name} is logged in
                {' '}<button onClick={handleLogout}>logout</button>
              </div>
              <div>
                <Togglable buttonLabel='create new blog'>
                  <Blogform
                    onSubmit={addBlog}
                    title={title}
                    setTitle={setTitle}
                    author={author}
                    setAuthor={setAuthor}
                    url={url}
                    setUrl={setUrl}  
                  />
                </Togglable>
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