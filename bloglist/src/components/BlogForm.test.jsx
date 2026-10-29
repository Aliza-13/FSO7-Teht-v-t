
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from '/BlogForm'

test('calls createBlog with correct details', async () => {
    const createBlog = vi.fn()

    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const inputs = screen.getAllByRole('textbox')

    const titleInput = inputs[0]
    const authorInput = inputs[1]
    const urlInput = inputs[2]

    const createButton = screen.getByText('create')

    await user.type(titleInput, 'Testing forms')
    await user.type(authorInput, 'Matti Meikäläinen')
    await user.type(urlInput, 'https://reactforms.com')

    await user.click(createButton)

    expect(createBlog).toHaveBeenCalledTimes(1)

    expect(createBlog.mock.calls[0][0]).toEqual({
        title: 'Testing forms',
        author: 'Matti Meikäläinen',
        url: 'https://reactforms.com'
    })
})