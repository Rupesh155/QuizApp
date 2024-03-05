// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const ShowChoicesPage = () => {
//   const { id,quizId } = useParams();
//   let navigate=useNavigate()
//   const [choices, setChoices] = useState([]);

//   useEffect(() => {
//     // Fetch choices from the server API when the component mounts
//     fetchChoices();
//   }, []);


//   const handelOpenForm=()=>{

//     navigate(`/admin/quiz/${quizId}/questions/${id}/choice/new`)


//   }

//   const fetchChoices = () => {
//     // Make a GET request to fetch choices from the server
//     fetch(`http://localhost:4000/api/question-choices/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setChoices(data);
        
//       })
//       .catch((error) => {
//         console.error('Error fetching choices:', error);
//       });
//   };

//   return (
//     <div>
//       <h3>Choices for Question {id}</h3>
//       <button  onClick={handelOpenForm}> Add choice</button>
//       <ul>
//         {choices?.map((choice) => (
//           <li key={choice._id}>
//             <strong>Choice Text:</strong> {choice.choiceId.title} <br />
//             <strong>Is Correct:</strong> {choice.isCorrect ? 'Yes' : 'No'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ShowChoicesPage;




import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ShowChoicesPage = () => {
  const { questionsId, quizId } = useParams();
  let navigate = useNavigate();
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    // Fetch choices from the server API when the component mounts
    fetchChoices();
  }, []);

  const handleOpenForm = () => {
    navigate(`/admin/quiz/${quizId}/questions/${questionsId}/choice/new`);
  };

  const handleEditChoice = (choiceId) => {
    console.log(choiceId,"choiceIdDDDDD");
    navigate(`/admin/quiz/${quizId}/questions/${questionsId}/choice/${choiceId}`);
  };

  const handleDeleteChoice = (choiceId) => {
    // Perform a DELETE request to delete the choice on the server
    fetch(`http://localhost:4000/api/choices/${choiceId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({questionsId:questionsId}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(`Choice with ID ${choiceId} deleted successfully`);
        // After deletion, fetch the updated list of choices
        fetchChoices();
      })
      .catch((error) => {
        console.error(`Error deleting choice with ID ${choiceId}:`, error);
      });
  };
//   65be9953e3170eb6534d0372
  const fetchChoices = () => {
    // Make a GET request to fetch choices from the server
    fetch(`http://localhost:4000/api/question-choices/${questionsId}`)
      .then((response) => response.json())
      .then((data) => {
        
        setChoices(data);
      
      })
      .catch((error) => {
        console.error('Error fetching choices:', error);
      });
  };

  return (
    <div>
      <h3>Choices for Question {questionsId}</h3>
      <button onClick={handleOpenForm}>Add Choice</button>
      <ul>
        {choices?.map((choice) => (
          <li key={choice._id}>
            <strong>Choice Text:</strong> {choice?.choiceId?.title} <br />
            <strong>Is Correct:</strong> {choice.isCorrect ? 'Yes' : 'No'}
            <button onClick={() => handleEditChoice(choice.choiceId?._id)}>Edit</button>
            <button onClick={() => handleDeleteChoice(choice.choiceId?._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowChoicesPage;

