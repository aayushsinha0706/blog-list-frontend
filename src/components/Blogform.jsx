import { useState } from 'react'
import PropTypes from 'prop-types'

const Blogform = ({
  createBlog
}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>create a new blog</h2>
      <div>
        title:
        <input
          name="title"
          type="text"
          placeholder="This is an example blog title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          name="author"
          type="text"
          placeholder="Example author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

      </div>
      <div>
        url:
        <input
          name="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

Blogform.propTypes = {
  createBlog: PropTypes.func.isRequired
}
export default Blogform