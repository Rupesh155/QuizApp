import React, { useState, useEffect } from 'react';
import { Link ,useNavigate,useParams} from 'react-router-dom';


const EditQuiz = () => {
 let {quizId}=    useParams()
    let navigate=    useNavigate()
  const [quizTitle, setQuizTitle] = useState('');


  useEffect(() => {
    // Fetch quiz data from your server API based on the quizId
    fetch(`http://localhost:4000/api/quizzes/${quizId}`)
      .then((response) => response.json())
      .then((data) => {
        // Update state with the fetched data
        setQuizTitle(data.title);
        console.log(data.title,"edit data");
      })
      .catch((error) => {
        console.error('Error fetching quiz data for editing:', error);
      });
  }, [quizId]);

  const handleTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleSaveChanges = () => {
    // Perform a PUT request to update the quiz data on your server API
    fetch(`http://localhost:4000/api/quizzes/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: quizTitle }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response or perform any necessary actions
        console.log('Quiz updated successfully:', data);
        navigate('/admin')
        
      })
      .catch((error) => {
        console.error('Error updating quiz:', error);
      });
  };

  return (
    <div>
      <h3>Edit Quiz</h3>
      <input
        type='text'
        placeholder='Enter edited quiz title'
        value={quizTitle}
        onChange={handleTitleChange}
      />
      <button onClick={handleSaveChanges}>Save Changes</button>
    </div>
  );
};

export default EditQuiz;
