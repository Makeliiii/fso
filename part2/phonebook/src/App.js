import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')

    const addName = event => {
        if (persons.some(person => person.name === newName)) {
            event.preventDefault()
            return alert(`${newName} is already added to the phonebook!`)
        }

        const personsCopy = [...persons]
        personsCopy.push({ name: newName, number: newNumber })
        setPersons(personsCopy)
        event.preventDefault()
    }

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3001/persons'
        }).then(obj => {
            console.log(obj.data)
            setPersons(obj.data)
        })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <h2>add a new</h2>
            <PersonForm 
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
                addName={addName}
            />
            <h2>Numbers</h2>
            <Persons
                persons={persons}
                filter={filter}
            />
        </div>
    )
}

export default App