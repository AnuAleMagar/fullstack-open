import React from "react";

const Total = ({parts}) => {
  const total=parts.reduce((total,item)=>{
      total=total+item.exercises;
      return total;
  },0)
  return (
    <>
      <h3>
        total of  {total} exercises 
      </h3>
    </>
  );
};

export default Total;
