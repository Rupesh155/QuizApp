import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
  const [quizTitle, setQuizTitle] = useState('');

  const handleCreateQuiz = () => {
    // Send a POST request to create a new quiz
    axios.post('http://localhost:4000/api/quizzes', { title: quizTitle })
      .then(response => {
        console.log('Quiz created:', response.data);
        // Optionally, you can reset the form or show a success message
      })
      .catch(error => console.error('Error creating quiz:', error));
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <label>
        Quiz Title:
        <input type="text" value={quizTitle} onChange={(e) => setQuizTitle(e.target.value)} />
      </label>
      <button onClick={handleCreateQuiz}>Create Quiz</button>
    </div>
  );
};

export default QuizForm;
