import { useState } from 'react'
const Blog = ({blog}) => {

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
      <div style={blogStyle}>
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
                  <button>like</button>
                </div>
                <div>
                  {blog.user.name}
                </div>  
              </div>
            : <div>
                <p>{blog.title}{' '}{blog.user.name}</p>
                <button onClick={toggleView}>view</button>
              </div>
         }
      </div>
    )
}

export default Blog