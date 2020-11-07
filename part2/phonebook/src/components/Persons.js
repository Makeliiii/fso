import React from 'react'

const Persons = props => {
    return (
        <div>
            {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase())).map((person, index) => {
                return <p key={index}>{person.name} {person.number}</p>
            })}
        </div>
    )
}

export default Persons