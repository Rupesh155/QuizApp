

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExamInterface = () => {
    let { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);

    useEffect(() => {
        const fetchExamDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/exams/${examId}/questions`);
                setExam(response.data);
                updateRemainingTime(response.data.exam.end_time, response.data.exam.start_time);
            } catch (error) {
                console.error('Failed to fetch exam details:', error);
            }
        };

        fetchExamDetails();
    }, [examId]);

    const updateRemainingTime = (endTime) => {
        const interval = setInterval(() => {
            const now = new Date();
            const end = new Date(endTime);
            const diff = end - now;
            if (diff <= 0) {
                clearInterval(interval);
                setRemainingTime('Time is up!');
            } else {
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setRemainingTime(`${minutes}m ${seconds}s`);
            }
        }, 1000);
    };

    const handleAnswerChange = (questionId, optionId) => {
        // Implement logic to handle user's answer selection
    };

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };
    // const renderQuestionChoices = (questionId) => {
    //     const question = exam.quizQuestions.find(q => q._id === questionId);
    //     if (question) {
    //         const choices = exam.questionChoices.filter(choice => choice.questionId === questionId);
    //         return (
    //             <div>
    //                 {choices.map(choice => (
    //                     <div key={choice._id}>
    //                         <label>
    //                             <input
    //                                 type="radio"
    //                                 name={questionId}
    //                                 value={choice.choiceId._id}
    //                                 onChange={() => handleAnswerChange(questionId, choice.choiceId._id)}
    //                             />
    //                             {choice.choiceId.title}
    //                         </label>
    //                     </div>
    //                 ))}
    //             </div>
    //         );
    //     }
    //     return null;
    // };
    

    // return (
    //     <div>
    //         {exam ? (
    //             <div>
    //                 <h1>{exam.exam.quiz_id.title}</h1>
    //                 <p>Start Time: {exam.exam.start_time}</p>
    //                 <p>End Time: {exam.exam.end_time}</p>
    //                 <p>Remaining Time: {remainingTime}</p>
    //                 <div key={exam.quizQuestions[currentQuestionIndex]._id}>
    //                     <h3>Question {currentQuestionIndex + 1}</h3>
    //                     <p>{exam.quizQuestions[currentQuestionIndex].questionId.title}</p>
    //                     {renderQuestionChoices(exam.quizQuestions[currentQuestionIndex]._id)}
    //                 </div>
    //                 <div style={{ flex: '1', marginLeft: '20px' }}>
    //                     <h3>Question List</h3>
    //                     {exam.quizQuestions.map((quizQuestion, index) => (
    //                         <button key={index} onClick={() => goToQuestion(index)}>
    //                             {index + 1}
    //                         </button>
    //                     ))}
    //                 </div>
    //             </div>
    //         ) : (
    //             <p>Loading exam...</p>
    //         )}
    //     </div>
    // );
    const renderCurrentQuestion = () => {
        const currentQuestion = exam.quizQuestions[currentQuestionIndex];
        const choices = exam.questionChoices.filter(choice => choice.questionId === currentQuestion.questionId._id);
        
        return (
            <div key={currentQuestion._id}>
                <h3>Question {currentQuestionIndex + 1}</h3>
                <p>{currentQuestion.questionId.title}</p>
                <div>
                    {choices.map(choice => (
                        <div key={choice._id}>
                            <label>
                                <input
                                    type="radio"
                                    name={currentQuestion.questionId._id}
                                    value={choice.choiceId._id}
                                    onChange={() => handleAnswerChange(currentQuestion.questionId._id, choice.choiceId._id)}
                                />
                                {choice.choiceId.title}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    
    
    return (
        <div>
            {exam ? (
                <div>
                    <h1>{exam.exam.quiz_id.title}</h1>
                    <p>Start Time: {exam.exam.start_time}</p>
                    <p>End Time: {exam.exam.end_time}</p>
                    <p>Remaining Time: {remainingTime}</p>
                    {renderCurrentQuestion()}
                    <div style={{ flex: '1', marginLeft: '20px' }}>
                        <h3>Question List</h3>
                        {exam.quizQuestions.map((quizQuestion, index) => (
                            <button key={index} onClick={() => goToQuestion(index)}>
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading exam...</p>
            )}
        </div>
    );
    
    
};

export default ExamInterface;
