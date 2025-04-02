import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogform from './Blogform'

test('5.16 The Blogform calls the event handler with right details when creating new blog', async () => {
  const createBlog = vi.fn()

  const { container } = render(<Blogform createBlog={createBlog} /> )
  const titleInput = screen.getByPlaceholderText('This is an example blog title')
  const authorInput = screen.getByPlaceholderText('Example author')
  const urlInput = screen.getByPlaceholderText('https://example.com')

  const user = userEvent.setup()
  await user.type(titleInput, 'example blog')
  await user.type(authorInput, 'exampleUser')
  await user.type(urlInput, 'https://example.com')

  const button = screen.getByText('create')
  await user.click(button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toStrictEqual(
    { title: 'example blog', author: 'exampleUser', url: 'https://example.com' }
  )

})