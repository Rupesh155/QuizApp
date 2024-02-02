import React from 'react'
import AdminPage from '../src/Admin /AdminPage'
import { Route,Routes,useParams } from 'react-router-dom'
import QuizForm from './Admin /QuizForm'
import Question from './Admin /Questions'
import EditQuiz from './Admin /EditForQuiz'
import DeleteQuiz from './Admin /DeletForQuiz'
import EditQuestion from './Admin /EditForQuestion'
import CreateQuestion from './Admin /CreateQuestions'
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
      <Route path="/admin" element={<AdminPage onOpenQuiz={handleOpenQuiz} />} />

        <Route path='/admin/quiz/new' element={<QuizForm/>}/>
        <Route path="/admin/quiz/edit/:id" element={<EditQuiz />} />
        <Route path="/admin/quiz/delet/:id" element={<DeleteQuiz/>} />
        <Route path="/admin/quiz/:id" element={<Question />} />
        <Route path="/admin/quiz/questions/:id/create" element={<CreateQuestion/>} />

        <Route path="/admin/quiz/edit/questions/:id" element={<EditQuestion/>} />




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