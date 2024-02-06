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
import Edit from './Exam/Edit';
const App = () => {




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
      <Route path="/admin" element={<AdminPage onOpenQuiz={handleOpenQuiz} />} />
        <Route path='/admin/quiz' element={<QuizForm/>}/>
        <Route path="/admin/quiz/edit/:quizId" element={<EditQuiz />} />
        <Route path="/admin/quiz/delet/:quizId" element={<DeleteQuiz/>} />
        <Route path="/admin/quiz/:quizId" element={<Question />} />
        <Route path="/admin/quiz/:quizId/questions/create" element={<CreateQuestion/>} />
        <Route path="/admin/quiz/:quizId/questions/:questionsId/new" element={<EditQuestion/>} />
        <Route path="/admin/quiz/:quizId/questions/:questionsId/choice" element={<Choice/>} />
        <Route path="/admin/quiz/:quizId/questions/:questionsId/choice/new" element={<CreateChoiceForm/>} />
        <Route path="/admin/quiz/:quizId/questions/:questionsId/choice/:choiceId" element={<EditChoicePage/>} />
        <Route  path='/exam'  element={<Exam/>}/>
        <Route  path='/exam/edit/:id'  element={<Edit/>}/>

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