const CourseHeader = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}
  
const Total = ({ course }) => {
  const sum = course.parts.map(part => part.exercises).reduce((a, b) => a + b)
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => {
        return <Part key={part.id} part={part} />
      })}
    </div>
  )
}
  
const Course = ({ course }) => {
  return (
    <div>
      <CourseHeader course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course