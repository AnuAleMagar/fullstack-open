import React from "react";
import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
function Course({ courses }) {
  return (
    <div><h1>Web Development Curriculum</h1>
      {courses.map((course) => {
        return (<div key={course.id}>
          <Header heading={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>)
      })}
    </div>
  );
}


export default Course;
