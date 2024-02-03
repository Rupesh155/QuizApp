import React, { useState } from 'react';
import { Link ,useNavigate,useParams,Outlet} from 'react-router-dom';

const QuizForm = () => {
 let navigate=     useNavigate()
  const [quizTitle, setQuizTitle] = useState('');

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleSaveQuiz = () => {
    // Perform a POST request to your server API to create a new quiz
    fetch('http://localhost:4000/api/quizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: quizTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or perform any necessary actions
        console.log('Quiz created successfully:', data);
        navigate('/admin')
      })
      .catch((error) => {
        console.error('Error creating quiz:', error);
      });
  };

  return (
    <div>
      <h3>Title</h3>
      <input
        type='text'
        placeholder='Enter your quiz title'
        value={quizTitle}
        onChange={handleTitleChange}
      />
      <button onClick={handleSaveQuiz}>Save</button>
    </div>
  );
};

export default QuizForm;
