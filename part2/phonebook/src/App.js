import React, { useEffect, useState } from 'react'

import requests from './functions/requests'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ filter, setFilter ] = useState('')
    const [ message, setMessage ] = useState(null)
    const [ style, setStyle ] = useState({
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    })

    const addName = event => {
        if (persons.some(person => person.name === newName)) {
            event.preventDefault()
            const confirmation = window.confirm(`${newName} is already added to the phonebook! Update number?`)
            const person = persons.find(person => person.name === newName)
            const data = {
                name: newName,
                number: newNumber
            }

            if (confirmation) {
                return requests.put('/api/persons/', person.id, data).catch(err => {
                    console.log(err)
                        setStyle({
                            color: 'red',
                            background: 'lightgrey',
                            fontSize: 20,
                            borderStyle: 'solid',
                            borderRadius: 5,
                            padding: 10,
                            marginBottom: 10,
                        })
                        setMessage(`Information of ${newName} has already been removed from server...`)
                })
            }
        }

        const data = {
            name: newName,
            number: newNumber
        }

        const personsCopy = [...persons]
        personsCopy.push(data)
        setPersons(personsCopy)
        setMessage(`Added ${newName}`)

        requests.create('/api/persons', data)

        event.preventDefault()
    }

    useEffect(() => {
        requests.get('/api/persons')
            .then(obj => {
                console.log(obj.data.persons)
                setPersons(obj.data.persons)
            })
    }, [])

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} style={style} />
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