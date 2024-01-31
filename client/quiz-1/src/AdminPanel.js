import React from 'react';
import QuizForm from './QuizForm';
import QuestionForm from './QuestionForm';
import ChoiceForm from './ChoiceForm';
import UserAttemptForm from './UserAttemptForm';
import QuestionChoiceForm from './QuestionChoiceForm'; // Import QuestionChoiceForm
import QuestionChoiceList from './QuestionChoiceList'; // Import QuestionChoiceList
const AdminPanel = () => {
  const userId = 1;
  const quizId = '65ba1ed253cd05264e44bcaa';
  const questionId = '65ba1ef553cd05264e44bcac';
  return (
    <div className="container">
      <h1>Admin Panel</h1>
      <div className="form-container">
        <div>
          <QuizForm />
          <QuestionForm quizId={quizId} />
          <ChoiceForm questionId={questionId} />
          {/* Include QuestionChoiceForm */}
          <QuestionChoiceForm questionId={questionId} />
        </div>
        {/* <div>
          <UserAttemptForm userId={userId} quizId={quizId} questionId={questionId} />
        </div> */}
      </div>
      {/* Include QuestionChoiceList */}
      {/* <div className="list-container">
        <QuestionChoiceList questionId={questionId} />
      </div> */}
    </div>
  );
};




export default AdminPanel;
