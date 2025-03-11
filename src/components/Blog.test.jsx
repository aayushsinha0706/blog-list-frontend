import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

    let container

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

        container = render(<Blog blog={blog} user={user} />).container
    })

    test('5.13 Blog renders title and author but not URL and likes by default', async () => {
        const div = container.querySelector('.blog')
        const button = screen.getByRole('button')
        expect(div).toHaveTextContent('example blog Example User')
        expect(button).toHaveTextContent('view')
        expect(div).not.toHaveTextContent('https://example.com')
        expect(div).not.toHaveTextContent('likes: 0')
    })
})