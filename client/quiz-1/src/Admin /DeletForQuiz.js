import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const DeleteQuiz = () => {
  const { quizId } = useParams();
  const [quizTitle, setQuizTitle] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    // Fetch quiz data from your server API based on the quizId
    fetch(`http://localhost:4000/api/quizzes/${quizId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuizTitle(data.title);
      })
      .catch((error) => {
        console.error('Error fetching quiz data for deletion:', error);
      });
  }, [quizId]);

  const handleDeleteQuiz = () => {
    // Perform a DELETE request to delete the quiz on your server API
    fetch(`http://localhost:4000/api/quizzes/${quizId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Quiz deleted successfully:', data);
        // Navigate back to the quizzes page or any other desired route
        navigate('/admin');
      })
      .catch((error) => {
        console.error('Error deleting quiz:', error);
      });
  };

  return (
    <div>
      <h3>Delete Quiz</h3>
      <p>Are you sure you want to delete the quiz "{quizTitle}"?</p>
      <button onClick={handleDeleteQuiz}>Delete Quiz</button>
    </div>
  );
};

export default DeleteQuiz;
