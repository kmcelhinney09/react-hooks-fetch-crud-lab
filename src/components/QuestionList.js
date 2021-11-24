import React from "react";
import QuestionItem from "./QuestionItem";
import { v4 as uuid } from "uuid"

function QuestionList({ questions, isLoaded, onDeleteClick, onAnswerChange}) {
  
  function handleDelete(questionID){
    fetch(`http://localhost:4000/questions/${questionID}`,{
      method: "DELETE"
    })
    .then(res => res.json())
    .then(question => onDeleteClick(questionID))
  }

  function handleAnswerChange(questionID, newAnswer){
    fetch(`http://localhost:4000/questions/${questionID}`,{
      method:"PATCH",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"correctIndex": parseInt(newAnswer)})
    })
    .then(res => res.json())
    .then(question => onAnswerChange(question))
}

  const displayQuestions = questions.map(question => <QuestionItem key={uuid()} question={question} onDelete={handleDelete} onAnswerChange={handleAnswerChange}/>
  )

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{!isLoaded ? <li>Loading Questions...</li> : displayQuestions}</ul>
    </section>
  );
}

export default QuestionList;
