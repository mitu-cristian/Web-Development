import React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <header style={headerStyle}>
            <h1>ToDo List</h1>
            <Link to="/">Home</Link> |  <Link to="/about">About</Link>
        </header>
    )
}

const headerStyle = {
    background: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '10px'
}