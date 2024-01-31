import React, { useState } from 'react';
import axios from 'axios';

const ChoiceForm = ({ questionId }) => {
  const [choiceTitle, setChoiceTitle] = useState('');

  const handleCreateChoice = () => {
    // Send a POST request to create a new choice for the specified question
    axios.post('http://localhost:4000/api/choices', { title: choiceTitle, questionId })
      .then(response => {
        console.log('Choice created:', response.data);
        // Optionally, you can reset the form or show a success message
      })
      .catch(error => console.error('Error creating choice:', error));
  };

  return (
    <div>
      <h2>Create Choice</h2>
      <label>
        Choice Title:
        <input type="text" value={choiceTitle} onChange={(e) => setChoiceTitle(e.target.value)} />
      </label>
      <button onClick={handleCreateChoice}>Create Choice</button>
    </div>
  );
};

export default ChoiceForm;
