import React, { useState } from 'react';
import axios from 'axios';

const UserAttemptForm = ({ userId, quizId, questionId }) => {
  const [markedChoiceId, setMarkedChoiceId] = useState('');

  const handleCreateUserAttempt = () => {
    // Send a POST request to record a user attempt for the specified quiz and question
    axios.post('/api/user-attempts', { userId, quizId, questionId, markedChoiceId })
      .then(response => {
        console.log('User attempt recorded:', response.data);
        // Optionally, you can reset the form or show a success message
      })
      .catch(error => console.error('Error recording user attempt:', error));
  };

  return (
    <div>
      <h2>Create User Attempt</h2>
      <label>
        Marked Choice ID:
        <input type="text" value={markedChoiceId} onChange={(e) => setMarkedChoiceId(e.target.value)} />
      </label>
      <button onClick={handleCreateUserAttempt}>Record User Attempt</button>
    </div>
  );
};

export default UserAttemptForm;
