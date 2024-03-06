import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap"

import AdminPage from '../src/Admin /AdminPage'
import { Route,Routes,useParams } from 'react-router-dom'
import QuizForm from './Admin /QuizForm'
import Question from './Admin /Questions'
import EditQuiz from './Admin /EditForQuiz'
import DeleteQuiz from './Admin /DeletForQuiz'
import EditQuestion from './Admin /EditForQuestion'
import CreateQuestion from './Admin /CreateQuestions'
import CreateChoiceForm from './Admin /CreateChoiceForm'
import Choice from './Admin /Choice'
import EditChoicePage from './Admin /EditChoice'
import Home from './Home'
import './App.css'
import Exam from './Exam/Exam';
import UsersInExam from './Exam/UsersInExam';
import AddUserToExam from './Exam/AddUserToExam';
import ShowExam from './Exam/ShowExam';
import EditExam from './Exam/EditExam';
import SignUpForm from './UserDashBoard/Authentications/Signup';
import LoginForm from './UserDashBoard/Authentications/Login';
import ExamDashboard from './UserDashBoard/ExamDashBoard';
import ExamInterface from './UserDashBoard/ExamInterface';

const App = () => {

  // i want editExam.js file for edit exam with some conditons case-1 if exam stated then we can not any changes , case-2.   if exam was not start then we can edit anythink , case-3 if exam end then we can not edit anythink case-4 start time never bhi less then end time 


  const handleOpenQuiz = (quizId) => {
  
    // Now you have access to the quizId in App.js
    console.log('Received quizId in App.js:', quizId);
    // Implement any logic you need with the quizId in App.js
  };

  return (
    <div>
  
      {/* <AdminPage/> */}
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<SignUpForm/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route  path='/userexam'  element={<ExamDashboard/>}/>
        <Route  path='/examInterface/:examId'  element={<ExamInterface/>}/>



      <Route path="/admin" element={<AdminPage onOpenQuiz={handleOpenQuiz} />} />
        <Route path='/admin/quiz/new' element={<QuizForm/>}/>
        <Route path="/admin/quiz/edit/:quizId" element={<EditQuiz />} />
        <Route path="/admin/quiz/delet/:quizId" element={<DeleteQuiz/>} />
        <Route path="/admin/quiz/:quizId" element={<Question />} />
        <Route path="/admin/quiz/:quizId/questions/create" element={<CreateQuestion/>} />
        <Route path="/admin/quiz/:quizId/questions/:questionsId/new" element={<EditQuestion/>} />
        <Route path="/admin/quiz/:quizId/questions/:questionsId/choice" element={<Choice/>} />
        <Route path="/admin/quiz/:quizId/questions/:questionsId/choice/new" element={<CreateChoiceForm/>} />
        <Route path="/admin/quiz/:quizId/questions/:questionsId/choice/:choiceId" element={<EditChoicePage/>} />
        <Route  path='/exam'  element={<Exam/>}/>
        <Route  path='/exam/showexam'  element={<ShowExam/>}/>
        <Route  path='/exam/edit/:examId'  element={<EditExam/>}/>
        <Route  path='/exam/:examId/new'  element={<AddUserToExam/>}/>
        <Route  path='/exam/:examId/users'  element={<UsersInExam/>}/>

        



        

      </Routes>
    
    </div>
  )
}

export default App
// import React, { useEffect, useState } from 'react'

// const App = () => {
  
//     let [data,SetData] = useState(0)

//     let fun1=()=>{
//       SetData(data+1)
//     }
  
//   useEffect(()=>{
//     console.log('HEHEH');
//   })
//   return (
//     <div>
//       <p  > {data}</p>
//       <button   onClick={fun1} > ad</button>
//     </div>
//   )
// }

// export default App