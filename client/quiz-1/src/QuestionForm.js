import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = ({ quizId }) => {
  const [questionTitle, setQuestionTitle] = useState('');

  const handleCreateQuestion = () => {
    // Send a POST request to create a new question for the specified quiz
    axios.post('http://localhost:4000/api/questions', { title: questionTitle, quizId })
      .then(response => {
        console.log('Question created:', response.data);
        // Optionally, you can reset the form or show a success message
      })
      .catch(error => console.error('Error creating question:', error));
  };

  return (
    <div>
      <h2>Create Question</h2>
      <label>
        Question Title:
        <input type="text" value={questionTitle} onChange={(e) => setQuestionTitle(e.target.value)} />
      </label>
      <button onClick={handleCreateQuestion}>Create Question</button>
    </div>
  );
};

export default QuestionForm;
