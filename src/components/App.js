import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(r => r.json())
      .then(questionData => {
        setQuestions(questionData)
        setIsLoaded(true)
      })
  }, [])

  function handleNewQuestion(newQuestion) {
    const postBody = {
      "prompt": newQuestion.prompt,
      "answers": [newQuestion.answer1, newQuestion.answer2, newQuestion.answer3, newQuestion.answer4],
      "correctIndex": parseInt(newQuestion.correctIndex),
    }

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postBody),
    })
      .then(res => res.json())
      .then(newQuestion => setQuestions([...questions, newQuestion]))
  }

  function handleDelete(questionID) {
    const updatedQuestions = questions.filter(question => question.id !== questionID);
    setQuestions(updatedQuestions)
  }

  function handleAnswerChange(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })
    setQuestions(updatedQuestions);
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm onNewQuestionSubmit={handleNewQuestion} /> : <QuestionList questions={questions} isLoaded={isLoaded} onDeleteClick={handleDelete} onAnswerChange={handleAnswerChange} />}
    </main>
  );
}

export default App;
