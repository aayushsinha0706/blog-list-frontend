import { useState, useEffect, useRef } from 'react'

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

  //user state variables
  const [user, setUser] = useState(null)

  // Notification messages state variables
  const [notification, setNotification] = useState(null)
  const [category, setCategory] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    const fetchBlogs = async () => {
      try{
        const blogs = await blogService.getAll()
        blogs.sort((a,b) => b.likes - a.likes)
        setBlogs(blogs)
      } catch {
        setBlogs([])
      }
    }
    fetchBlogs()
  })


  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogAppUser')
    if ( loggedUser ){
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  },[])

  const loginFunc = async ({username, password}) => {
    try {
      const user = await loginService.login({username, password})
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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

  const createBlog = async ({
    title, author, url
  }) => {
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogFormRef.current.toggleVisibility()
    const createdBlog = await blogService.addBlog(newBlog)
    if (createdBlog){
      setBlogs(blogs.concat(createdBlog))
      setCategory('add')
      setNotification(`A new blog ${createdBlog.title} by ${createdBlog.author} has been added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const likeBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = {...blog, likes: blog.likes + 1}
    try{
      const updatedBlog = await blogService.likeBlog(id, likedBlog)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    }catch (error) {
      console.error(error)
    }
  } 

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.find(blog => blog.id === id)
      if ( window.confirm(`Remove ${blog.title} by ${blog.user.name}`)){
        const statusCode = await blogService.deleteBlog(id)
        statusCode === 204 
          ? setBlogs(blogs.filter(blog => blog.id !== id))
          : ''
      }
    } catch (error) {
      console.error(error)
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
                  loginFunc={loginFunc}
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
                <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                  <Blogform
                    createBlog={createBlog}
                  />
                </Togglable>
              </div>
              {blogs.map(blog => (
                <Blog 
                  key={blog.id} 
                  blog={blog} 
                  likeBlog={() => likeBlog(blog.id)}
                  deleteBlog={() => deleteBlog(blog.id)}
                  user={user}
                />
              ))}
            </div>
      }
    </div>

  )
}

export default App