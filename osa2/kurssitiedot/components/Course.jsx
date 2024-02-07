/* eslint-disable react/prop-types */
const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };
  
  const Header = ({ course }) => {
    return (
      <>
        <h1>{course}</h1>
      </>
    );
  };
  
  const Content = ({ parts }) => {
    console.log(parts[0]);
    return (
      <>
        {parts.map((p) => {
          return <Part key={p.id} part={p} />
        })}
      </>
    );
  };
  
  const Part = ({ part }) => {
    return (
      <>
        <p>
          {part.name} {part.exercises}
        </p>
      </>
    );
  };
  
  const Total = ({ parts }) => {
  
    const total = parts.map(p => p.exercises).reduce((accumilator, num) => accumilator+num, 0)
  
    return (
      <>
        <p>
          Number of exercises {total}
        </p>
      </>
    );
  };

export default Course