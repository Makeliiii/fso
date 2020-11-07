import React from 'react'

const PersonForm = props => {
    return (
        <form>
            <div>
            name: <input type="text" value={props.newName} onChange={e => props.setNewName(e.target.value)} />
            </div>
            <div>
            number: <input type="text" value={props.newNumber} onChange={e => props.setNewNumber(e.target.value)} />
            </div>
            <div>
            <button type="submit" onClick={props.addName}>add</button>
            </div>
        </form>
    )
}

export default PersonForm