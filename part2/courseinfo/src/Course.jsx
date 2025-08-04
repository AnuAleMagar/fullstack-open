import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'
function Course({course}) {
  return (
    <div key={course.id}>
        <Header heading={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts} />
    </div>
  )
}

export default Course