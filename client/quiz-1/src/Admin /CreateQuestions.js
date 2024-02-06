import React, { useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
const CreateQuestion = () => {
  const [questionTitle, setQuestionTitle] = useState('');
  const navigate = useNavigate();
  let {quizId}=useParams()
  const handleTitleChange = (e) => {
    setQuestionTitle(e.target.value);
  };
  const handleSaveQuestion = () => {
    // Perform a POST request to create a new question on your server API
    fetch('http://localhost:4000/api/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: questionTitle , quizId:quizId}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Question created successfully:', data);
        navigate(`/admin/quiz/${quizId}`)
        // Navigate back to the questions page or any other desired route
       
      })
      .catch((error) => {
        console.error('Error creating question:', error);
      });
  };
  return (
    <div>
      <h3>Create Question</h3>
      <label>
        Question Title:
        <input
          type='text'
          placeholder='Enter question title'
          value={questionTitle}
          onChange={handleTitleChange}
        />
      </label>
      <button onClick={handleSaveQuestion}>Save Question</button>
    </div>
  );
};

export default CreateQuestion;
