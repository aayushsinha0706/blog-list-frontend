import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({blog, likeBlog, deleteBlog, user}) => {

  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleView = () => {
    setView(!view)
  }
  
    return (
      <div style={blogStyle} className='blog' data-testid='blog'>
        {
          view
           ? <div>
                <div>
                  {blog.title} {blog.author}
                  <button onClick={toggleView}>Hide</button>
                </div>
                <a href={blog.url}>{blog.url}</a>
                <div>
                  likes: {blog.likes}
                  <button onClick={likeBlog}>like</button>
                </div>
                <div>
                  {blog.user.name}
                </div>
                {
                  user.username === blog.user.username 
                    ? <div>
                        <button onClick={deleteBlog}>remove</button>
                      </div>
                    : ''
                }
              </div>
            : <div>
                <p>{blog.title}{' '}{blog.user.name}</p>
                <button onClick={toggleView}>view</button>
              </div>
         }
      </div>
    )
}

Blog.propTypes = {
  blog : PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog