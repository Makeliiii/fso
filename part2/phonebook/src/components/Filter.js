import React from 'react'

const Filter = props => {
    return (
        <div>
            filter shown with <input type="text" value={props.filter} onChange={e => props.setFilter(e.target.value)} />
        </div>
    )
}

export default Filter