import { useState } from 'react';

function UserSearch() {

    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return (
        <div className="grid">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <input className="form-input" placeholder='search' value={text} onChange={handleChange} />
                        <button className='button button-ghost search'>Go</button>
                    </div>
                </form>
            </div>

            <div>
                <button className='button button-ghost clear'>Clear</button>
            </div>
        </div>
    )
}

export default UserSearch
