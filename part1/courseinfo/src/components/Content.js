import React from 'react'

// components
import Part from './Part'

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map(part => {
                return (
                    <Part part={part.name} exercises={part.exercises} />
                )
            })}
        </div>
    )
}

export default Content