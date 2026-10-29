
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import Blog from './Blog'

test('shows url and likes when view button is clicked', async () => {
    const blog = {
        title: 'react patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com',
        likes: 7
    }

    render(
        <Blog
            blog={blog}
            handleLike={() =>{}}
            handleDelete={() => {}}
        />
    )

    const user = userEvent.setup()

    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.getAllByText('https://reactpatterns.com'))
        .toHaveLength(1)

    expect(screen.getAllByText('7 likes'))
        .toHaveLength(1)
})

test('like button calls event handler twice', async () => {
    const blog = {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com',
        likes: 7
    }

    const mockHandler = vi.fn()

    render(
        <Blog
            blog={blog}
            handleLike={mockHandler}
            handleDelete={() => {}}
        />
    )

    const user = userEvent.setup()

    //blogin tiedot näkyviin
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    //etsitään like nappia
    const likeButton = screen.getByText('like')

    //klikkaus kahdesti
    await user.click(likeButton)
    await user.click(likeButton)

    //kutsujen määrän tarkitus
    expect(mockHandler.mock.calls).toHaveLength(2)
})