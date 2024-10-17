import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('render blog with title', () => {
  const blog = {
    title: 'hello',
    author: 'hallo',
    url: 'kjdfgshdfdsg',
    likes:3,
    user: {
      username:'hehe'
    }
  }

  render(<Blog blog={blog} />)
  const element = screen.getByText('hello')
})

test('other blog details are shown', async () => {
  const blog = {
    title: 'hello',
    author: 'hallo',
    url: 'kjdfgshdfdsg',
    likes:3,
    user: {
      username:'hehe'
    }
  }

  render(<Blog blog={blog}/>)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  screen.getByText('kjdfgshdfdsg')
  screen.getByText(3)
  screen.getByText('hehe')

})

test('function is called twice', async () => {

    const mockLikes = vi.fn()
    const blog = {
        title: 'hello',
        author: 'hallo',
        url: 'kjdfgshdfdsg',
        likes:3,
        user: {
          username:'hehe'
        }
      }

      render(<Blog blog={blog} updateBlogs={mockLikes} />)
      const user = userEvent.setup()
      const view = screen.getByText('view')
      await user.click(view)

      const like = screen.getByText('like')
      await user.click(like)
      await user.click(like)

      expect(mockLikes.mock.calls).toHaveLength(2)
})