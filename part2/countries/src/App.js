import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Search = props => {
  return (
    <div>
      find countries <input value={props.search} onChange={e => props.setSearch(e.target.value)} />
    </div>
  )
}

const Weather = props => {
  const key = process.env.REACT_APP_API_KEY
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${props.capital}`
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios({ method: 'get', url }).then(obj => {
      setWeather(obj.data)
      console.log(obj.data)
    })
  }, [])

  if (!weather.current && props.capital) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <h2>Weather in {props.capital}</h2>
        <p><b>temperature:</b> {weather.current.temperature} celcius</p>
        <img src={weather.current.weather_icons[0]} width="75" />
        <p><b>wind:</b> {weather.current.wind_speed} KM/H direction {weather.current.wind_dir}</p>
      </div>
    )
  }
}

const Countries = props => {
  const filteredCountries = props.countries.filter(country => country.name.toLowerCase().includes(props.search.toLowerCase()))
  const mappedCountries = filteredCountries.map(country => {
    return <p key={country.alpha2Code}>{country.name} <button onClick={() => props.setSearch(country.name)}>show</button></p> 
  })

  return (
    <div>
      {
        filteredCountries.length > 10 ? <p>Too many matches, specify another filter</p>
      : filteredCountries.length === 1 ? (
            <div>
              <h1>{filteredCountries[0].name}</h1>
              <p>Capital {filteredCountries[0].capital}</p>
              <p>Population {filteredCountries[0].population}</p>
              <h2>Languages</h2>
              <ul>
                {filteredCountries[0].languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
              </ul>
              <img src={filteredCountries[0].flag} width="500" />
              <Weather capital={filteredCountries[0].capital} />
            </div>
          )
      : mappedCountries
      }
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://restcountries.eu/rest/v2/all'
    }).then(obj => {
      setCountries(obj.data)
      console.log(countries)
    })
  }, [])

  return (
    <div>
      <Search search={search} setSearch={setSearch} />
      <Countries countries={countries} search={search} setSearch={setSearch} />
    </div>
  )
}

export default App
