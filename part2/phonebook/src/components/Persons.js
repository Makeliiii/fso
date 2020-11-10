import React from 'react'

import requests from '../functions/requests'

const Persons = props => {
    const handleClick = person => {
        const confirmation = window.confirm(`Delete ${person.name}?`)

        if (confirmation) {
            return requests.dlt('/api/persons/', person.id)
        }
    }

    return (
        <div>
            {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map((person, index) => {
                return <p key={index}>{person.name} {person.number} <button onClick={() => handleClick(person)}>delete</button></p>
            })}
        </div>
    )
}

export default Persons