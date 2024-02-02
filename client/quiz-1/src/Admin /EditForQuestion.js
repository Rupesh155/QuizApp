import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditQuestion = () => {
  const { id } = useParams();
  const [questionTitle, setQuestionTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch question data from your server API based on the question ID
    fetch(`http://localhost:4000/api/questions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestionTitle(data.title);
      })
      .catch((error) => {
        console.error('Error fetching question data for editing:', error);
      });
  }, [id]);

  const handleTitleChange = (e) => {
    setQuestionTitle(e.target.value);
  };

  const handleSaveChanges = () => {
    // Perform a PUT request to update the question data on your server API
    fetch(`http://localhost:4000/api/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: questionTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Question updated successfully:', data);
        // Navigate back to the questions page or any other desired route
        navigate('/questions');
      })
      .catch((error) => {
        console.error('Error updating question:', error);
      });
  };

  return (
    <div>
      <h3>Edit Question</h3>
      <input
        type='text'
        placeholder='Enter edited question title'
        value={questionTitle}
        onChange={handleTitleChange}
      />
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditQuestion;
