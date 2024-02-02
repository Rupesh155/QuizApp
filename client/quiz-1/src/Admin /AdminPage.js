// // src/components/AdminPage.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import QuizList from './QuizList';
// import NewQuizForm from './NewQuizForm';
// const AdminPage = () => {
//   const [quizzes, setQuizzes] = useState([]);

//   // Function to create a new quiz
//   const handleCreateQuiz = (newQuiz) => {
//     setQuizzes([...quizzes, newQuiz]);
//   };

//   return (
//     <div>
//       <h1>Admin Panel</h1>

//       {/* Quizzes Section */}
//       <QuizList quizzes={quizzes} />

//       {/* Create New Quiz Section */}
//       <NewQuizForm onCreateQuiz={handleCreateQuiz} />

//       <Link to="/">Go to Home</Link>
//     </div>
//   );
// };

// export default AdminPage;


// src/components/AdminPage.js



import React, { useState, useEffect } from 'react';
import './Admin.css';
import { Link ,useNavigate,useParams,Outlet} from 'react-router-dom';

const AdminPage = ({ onOpenQuiz }) => {
    const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quiz data from your API
    fetch('http://localhost:4000/api/quizzes')
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
     
      .catch((error) => console.error('Error fetching quizzes:', error));
  }, []);

  const handleCreateQuiz = () => {
    // Implement logic to create a new quiz using your API
    // Example: fetch('YOUR_API_ENDPOINT/quiz', { method: 'POST', body: JSON.stringify(newQuiz) })
    console.log('Create quiz logic goes here');
  };

  const handleEditQuiz = (quizId) => {
    // Implement logic to edit the quiz using your API
    // Example: fetch(`YOUR_API_ENDPOINT/quiz/${quizId}`, { method: 'PUT', body: JSON.stringify(updatedQuiz) })
    console.log(`Edit quiz with ID ${quizId} logic goes here`);
    navigate(`/admin/quiz/edit/${quizId}`)
  };


  const handleOpenQuiz=(quizId)=>{

    console.log(quizId,"quiessssssss");
        // Pass the quizId to the parent component (App.js)
        onOpenQuiz(quizId);
        navigate(`/admin/quiz/${quizId}`);
        // console.log(navigate,"rrrrr");
        // navigate('/admin')


  }

  const handleDeleteQuiz = (quizId) => {
    // Implement logic to delete the quiz using your API
    // Example: fetch(`YOUR_API_ENDPOINT/quiz/${quizId}`, { method: 'DELETE' })
    console.log(`Delete quiz with ID ${quizId} logic goes here`);
    navigate(`/admin/quiz/delet/${quizId}`)

  };

  return (
    <div className='main'>
      <div className='card'>
        <div className='nav'>    
          <h2> Quizzes </h2>
          {/* <button onClick={handleCreateQuiz}> Create</button> */}
          <Link to='/admin/quiz/new'> Create</Link>
        </div>
   
        {quizzes.map((quiz) => (
          <div className='quiz_title' key={quiz._id}>
            <div   onClick={() => handleOpenQuiz(quiz._id)} >{quiz.title}</div>
            <button onClick={() => handleEditQuiz(quiz._id)}> Edit </button>
            <button onClick={() => handleDeleteQuiz(quiz._id)}> Delete </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
