import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateChoiceForm = () => {
  const { questionsId } = useParams();

  const navigate = useNavigate();

  const [choice, setChoice] = useState({
    text: '',
    isCorrect: false,
    // Add more properties if needed
  });

  const handleInputChange = (e) => {
    setChoice({
      ...choice,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setChoice({
      ...choice,
      [e.target.name]: e.target.checked,
    });
  };

  const handleCreateChoice = () => {
    // Perform the create using a POST request
    fetch(`http://localhost:4000/api/choices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title:choice.text,isCorrect:choice.isCorrect,questionId:questionsId}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Choice created successfully:', data);
        // Redirect to the choices list or any other desired route
        navigate(`/admin/questions/${questionsId}`);
      })
      .catch((error) => console.error('Error creating choice:', error));
  };

  return (
    <div>
      <h3>Create Choice</h3>
      <label>
        Choice Text:
        <input
          type='text'
          name='text'
          value={choice.text}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Is Correct:
        <input
          type='checkbox'
          name='isCorrect'
          checked={choice.isCorrect}
          onChange={handleCheckboxChange}
        />
      </label>
      {/* Add more input fields for other choice properties if needed */}
      <button onClick={handleCreateChoice}>Create Choice</button>
    </div>
  );
};

export default CreateChoiceForm;
