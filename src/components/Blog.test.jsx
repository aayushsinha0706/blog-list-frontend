import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

    let container, likeBlog

    beforeEach(() => {
        const blog = {
            "url": "https://example.com",
            "title": "example blog",
            "author": "exampleUser",
            "user": {
                "username": "exampleUser",
                "name": "Example User",
                "id": 1
            },
            "likes": 0,
            "id": 1
        }

        const user = {
            "username": "exampleUser",
            "name": "Example User",
        }

        likeBlog = vi.fn()

        container = render(<Blog blog={blog} user={user} likeBlog={likeBlog} />).container
    })

    test('5.13 Blog renders title and author but not URL and likes by default', async () => {
        const div = container.querySelector('.blog')
        const button = screen.getByRole('button')
        expect(div).toHaveTextContent('example blog Example User')
        expect(button).toHaveTextContent('view')
        expect(div).not.toHaveTextContent('https://example.com')
        expect(div).not.toHaveTextContent('likes: 0')
    })

    test("5.14 blog's URL and number of likes are shown when button view is clicked", async () => {
        const user = userEvent.setup()
        const button = screen.getByRole('button')
        await user.click(button)

        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent('example blog exampleUser')
        expect(div).toHaveTextContent('https://example.com')
        expect(div).toHaveTextContent('likes: 0')
        expect(div).toHaveTextContent('Example User')
    })

    test("If the like button is clicked twice, the event handler is called twice", async () => {
        let user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        user = userEvent.setup()
        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(likeBlog.mock.calls).toHaveLength(2)
    })
})