
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const BlogCard = styled.div`
    border: 1px solid #d1d5db;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
    background: white;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`

export const BlogTitle = styled.h2`
    margin-top: 0;
    color: #0f182a;
`

export const BlogInfo = styled.p`
    margin: 8px 0;
    color: #475569;
`


export const NavBar = styled.nav`
    background: #14b8a6;
    padding: 14px 24px;

    display: flex;
    gap: 20px;
    align-items: center;
`

export const NavLink = styled.a`
    color: white;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`

export const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        color: #d1fae5;
    }
`



export const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 12px;

    border: 1px solid #ccc;
    border-radius: 6px;

    font-size: 16px;
`

export const Button = styled.button`
    background: #2563eb;
    color: white;

    border: none;
    border-radius: 6px;

    padding: 10px 18px;

    cursor: pointer;
    font-weight: bold;

    &:hover {
        background: #1d4ed8;
    }
`

export const LikeButton = styled(Button)`
    background: #22c55e;

    &:hover {
        background: #16a34a
    }
`

export const DeleteButton = styled(Button)`
    background: #ef4444;

    &:hover {
        background: #dc2626;
    }
`


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 12px
`