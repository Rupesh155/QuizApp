import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ExamInterface = () => {
    let { examId } = useParams();
    const [exam, setExam] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [remainingTime, setRemainingTime] = useState(null);
    const [userAnswers, setUserAnswers] = useState({});

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
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
            }
        }, 1000);
    };
    

    const goToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const renderCurrentQuestion = () => {
        if (!exam) return null;

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
                                    checked={userAnswers[currentQuestion.questionId._id] === choice.choiceId._id}
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

    const submitExam = async () => {
        try {
            const responses = [];

            for (const quizQuestion of exam.quizQuestions) {
                const selectedChoiceId = userAnswers[quizQuestion.questionId._id];
                const correctChoice = exam.questionChoices.find(choice =>
                    choice.questionId === quizQuestion.questionId._id && choice.isCorrect
                );

                if (correctChoice) {
                    const isCorrect = selectedChoiceId === correctChoice.choiceId._id;

                    responses.push({
                        questionId: quizQuestion.questionId._id,
                        choiceId: selectedChoiceId,
                        examId: examId,
                        isCorrect: isCorrect
                    });
                }
            }

            const response = await axios.post(`http://localhost:4000/api/markChoices`, responses);
            console.log('Exam submitted successfully:', response.data);
        } catch (error) {
            console.error('Failed to submit exam:', error);
        }
    };

    const handleAnswerChange = (questionId, optionId) => {
        setUserAnswers(prevState => ({
            ...prevState,
            [questionId]: optionId
        }));
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
                    <button onClick={submitExam}>Submit Exam</button>
                </div>
            ) : (
                <p>Loading exam...</p>
            )}
        </div>
    );
};

export default ExamInterface;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const ExamInterface = () => {
//     let { examId } = useParams();
//     const [exam, setExam] = useState(null);
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//     const [remainingTime, setRemainingTime] = useState(null);
//     const [userAnswers, setUserAnswers] = useState({});
//     const [examSubmitted, setExamSubmitted] = useState(false);
//     const [intervalId, setIntervalId] = useState(null);

//     useEffect(() => {
//         const fetchExamDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:4000/api/exams/${examId}/questions`);
//                 setExam(response.data);
//                 updateRemainingTime(response.data.exam.end_time, response.data.exam.start_time);
//             } catch (error) {
//                 console.error('Failed to fetch exam details:', error);
//             }
//         };

//         fetchExamDetails();
//     }, [examId]);

//     useEffect(() => {
//         return () => {
//             clearInterval(intervalId);
//         };
//     }, [intervalId]);

//     const updateRemainingTime = (endTime) => {
//         const interval = setInterval(() => {
//             const now = new Date();
//             const end = new Date(endTime);
//             const diff = end - now;
//             if (diff <= 0) {
//                 clearInterval(interval);
//                 setRemainingTime('Time is up!');
//             } else {
//                 const hours = Math.floor(diff / (1000 * 60 * 60));
//                 const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//                 const seconds = Math.floor((diff % (1000 * 60)) / 1000);
//                 setRemainingTime(`${hours}h ${minutes}m ${seconds}s`);
//             }
//         }, 1000);
//         setIntervalId(interval);
//     };
    
//     const goToQuestion = (index) => {
//         setCurrentQuestionIndex(index);
//     };

//     const renderCurrentQuestion = () => {
//         if (!exam) return null;

//         const currentQuestion = exam.quizQuestions[currentQuestionIndex];
//         const choices = exam.questionChoices.filter(choice => choice.questionId === currentQuestion.questionId._id);

//         return (
//             <div key={currentQuestion._id}>
//                 <h3>Question {currentQuestionIndex + 1}</h3>
//                 <p>{currentQuestion.questionId.title}</p>
//                 <div>
//                     {choices.map(choice => (
//                         <div key={choice._id}>
//                             <label>
//                                 <input
//                                     type="radio"
//                                     name={currentQuestion.questionId._id}
//                                     value={choice.choiceId._id}
//                                     checked={userAnswers[currentQuestion.questionId._id] === choice.choiceId._id}
//                                     onChange={() => handleAnswerChange(currentQuestion.questionId._id, choice.choiceId._id)}
//                                 />
//                                 {choice.choiceId.title}
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         );
//     };

//     const submitExam = async () => {
//         try {
//             const responses = [];

//             for (const quizQuestion of exam.quizQuestions) {
//                 const selectedChoiceId = userAnswers[quizQuestion.questionId._id];
//                 const correctChoice = exam.questionChoices.find(choice =>
//                     choice.questionId === quizQuestion.questionId._id && choice.isCorrect
//                 );

//                 if (correctChoice) {
//                     const isCorrect = selectedChoiceId === correctChoice.choiceId._id;

//                     responses.push({
//                         questionId: quizQuestion.questionId._id,
//                         choiceId: selectedChoiceId,
//                         examId: examId,
//                         isCorrect: isCorrect
//                     });
//                 }
//             }

//             const response = await axios.post(`http://localhost:4000/api/markChoices`, responses);
//             console.log('Exam submitted successfully:', response.data);
//             setExamSubmitted(true); // Set examSubmitted to true
//             clearInterval(intervalId); // Stop the timer
//         } catch (error) {
//             console.error('Failed to submit exam:', error);
//         }
//     };

//     const handleAnswerChange = (questionId, optionId) => {
//         setUserAnswers(prevState => ({
//             ...prevState,
//             [questionId]: optionId
//         }));
//     };

//     return (
//         <div>
//             {exam ? (
//                 <div>
//                     <h1>{exam.exam.quiz_id.title}</h1>
//                     <p>Start Time: {exam.exam.start_time}</p>
//                     <p>End Time: {exam.exam.end_time}</p>
//                     <p>Remaining Time: {remainingTime}</p>
//                     {!examSubmitted && renderCurrentQuestion()}
//                     {!examSubmitted && (
//                         <div style={{ flex: '1', marginLeft: '20px' }}>
//                             <h3>Question List</h3>
//                             {exam.quizQuestions.map((quizQuestion, index) => (
//                                 <button key={index} onClick={() => goToQuestion(index)}>
//                                     {index + 1}
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                     {!examSubmitted && (
//                         <button onClick={submitExam}>Submit Exam</button>
//                     )}
//                     {examSubmitted && <p>Exam submitted. Thank you!</p>}
//                 </div>
//             ) : (
//                 <p>Loading exam...</p>
//             )}
//         </div>
//     );
// };

// export default ExamInterface;
