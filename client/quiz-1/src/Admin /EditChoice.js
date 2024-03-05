import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditChoicePage = () => {
  const { questionsId, quizId, choiceId } = useParams();
//   console.log(choiceId,"hcocieee");
  const navigate = useNavigate();
  const [choice, setChoice] = useState({
    title: '',
    isCorrect: false,
  });

  useEffect(() => {
    // Fetch the choice data from the server API when the component mounts
    fetchChoice();
  }, []);

  const fetchChoice = () => {
    // Make a GET request to fetch the choice data from the server
    fetch(`http://localhost:4000/api/choices/${choiceId}`)
      .then((response) => response.json())
      .then((data) => {
        // data.map((data)=>console.log(data.choiceId,"databhi"))
        console.log(data.choiceId,"vhoiceeeeeeee");
        setChoice(data);
        
      })
      .catch((error) => {
        console.error('Error fetching choice:', error);
      });
  };
  // 65beaa28ffced664abe600bd
  // 65beab0effced664abe600db
  const handleUpdateChoice = () => {
    // Perform a PUT request to update the choice on the server
    fetch(`http://localhost:4000/api/choices/${choiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({choice,questionsId,choiceId}),
    })
      .then((response) => response.json())  
      .then((data) => {
        console.log(`Choice with ID ${choiceId} updated successfully`);
        navigate(`/admin/quiz/${quizId}/questions/${questionsId}/choice`);
      })
      .catch((error) => {
        console.error(`Error updating choice with ID ${choiceId}:`, error);
      });
  };

  // const handleChange = (e) => {
  //   setChoice({
  //     ...choice,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    setChoice(prevChoice => ({
      ...prevChoice,
      [name]: newValue,
    }));
  };
  
  
  

  return (
    <div>
      <h3>Edit Choice</h3>
      <label>
        Choice Text:
        <input type="text" name="title" value={choice.title} onChange={handleChange} />
      </label>
      <label>
        Is Correct:
        <input
          type="checkbox"
          name="isCorrect"
          checked={choice.isCorrect}
          onChange={() => setChoice({ ...choice, isCorrect: !choice.isCorrect })}
        /> 
      </label>
      <button onClick={handleUpdateChoice}>Update Choice</button>
    </div>
  );
};

export default EditChoicePage;
