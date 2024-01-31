import React, { useState, useEffect } from 'react';
import axios from 'axios';
const QuestionChoiceList = ({ questionId }) => {
  const [questionChoices, setQuestionChoices] = useState([]);

  useEffect(() => {
    // Fetch existing QuestionChoices for the question
    axios.get(`/api/question-choices/${questionId}`)
      .then(response => setQuestionChoices(response.data))
      .catch(error => console.error('Error fetching QuestionChoices:', error));
  }, [questionId]);

  const handleDeleteQuestionChoice = (questionChoiceId) => {
    // Send a DELETE request to remove the QuestionChoice
    axios.delete(`/api/question-choices/${questionChoiceId}`)
      .then(() => {
        console.log('QuestionChoice deleted:', questionChoiceId);
        // Optionally, you can update the state or show a success message
      })
      .catch(error => console.error('Error deleting QuestionChoice:', error));
  };

  return (
    <div>
      <h2>QuestionChoice List</h2>
      <ul>
        {questionChoices.map(questionChoice => (
          <li key={questionChoice._id}>
            Choice ID: {questionChoice.choiceId}
            <button onClick={() => handleDeleteQuestionChoice(questionChoice._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionChoiceList;
