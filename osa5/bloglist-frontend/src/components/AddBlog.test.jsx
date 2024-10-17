import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

test('correct data', async () => {
    const user = userEvent.setup()
    const submit = vi.fn()

    render(<AddBlog submitNewBlog={submit}/>)

    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button')

    await user.type(inputs[0], "Title")
    await user.type(inputs[1], "Author")
    await user.type(inputs[2], "Url")
    await user.click(button)
    
    expect(submit.mock.calls).toHaveLength(1)
    expect(submit.mock.calls[0][0].title).toBe('Title')
    console.log(submit.mock.calls[0][0].title)
    expect(submit.mock.calls[0][0].author).toBe('Author')
    expect(submit.mock.calls[0][0].url).toBe('Url')
})