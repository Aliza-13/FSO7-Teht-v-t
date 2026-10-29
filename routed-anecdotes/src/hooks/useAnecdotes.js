
import { useState, useEffect } from 'react'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
    const [anecdotes, setAnecdotes] = useState([])

    const addAnecdote = async (anecdote) => {
        const newAnecdote = await anecdoteService.createNew(anecdote)
        setAnecdotes(anecdotes.concat(newAnecdote))
    }

    const deleteAnecdote = async (id) => {
        //poistetaan palvelimelta
        await anecdoteService.remove(id)
        //päivitetään paikallinen state
        setAnecdotes(anecdotes.filter(a => a.id !== id))
    }


    useEffect(() => {
        anecdoteService.getAll().then(data => setAnecdotes(data))
    }, [])


    return {
        anecdotes,
        addAnecdote,
        deleteAnecdote
    }
}