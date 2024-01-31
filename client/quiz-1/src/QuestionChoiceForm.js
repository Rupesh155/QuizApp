import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionChoiceForm = ({ questionId }) => {
    console.log(questionId,":rrrrr");
  const [choices, setChoices] = useState([]);
  console.log(choices,"choiceeeeeeeeeeeeeeeeee");
  const [selectedChoiceId, setSelectedChoiceId] = useState('');

  useEffect(() => {
    // Fetch existing choices for the question
    axios.get(`http://localhost:4000/api/question-choices/${questionId}`)
      .then(response => setChoices(response.data))
      // console.log(response.data,"data ")
      .catch(error => console.error('Error fetching choices:', error));
  }, [questionId]);

  const handleCreateQuestionChoice = () => {
    // Send a POST request to create a new QuestionChoice
    axios.post(`/api/question-choices/${questionId}`, { choiceId: selectedChoiceId })
      .then(response => {
        console.log('QuestionChoice created:', response.data);
        // Optionally, you can reset the form or show a success message
      })
      .catch(error => console.error('Error creating QuestionChoice:', error));
  };
  return (
    <div>
      <h2>Create QuestionChoice</h2>
      <label>
        Select Choice:
        <select value={selectedChoiceId} onChange={(e) => setSelectedChoiceId(e.target.value)}>
          <option value="">Select...</option>
          {choices.map(choice => (
            <option key={choice._id} value={choice._id}>{choice._id}</option>
          ))}
        </select>
      </label>
      <button onClick={handleCreateQuestionChoice}>Create QuestionChoice</button>
    </div>
  );
};

export default QuestionChoiceForm;
