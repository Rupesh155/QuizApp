import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Questions.css';
const Questions = () => {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();
    let { quizId ,questionId} = useParams()
   
    useEffect(() => {
        // Fetch questions from the server API when the component mounts
        fetchQuestions();
    }, []);

    const fetchQuestions = () => {
        // Make a GET request to fetch questions from the server
        fetch(`http://localhost:4000/api/quiz-questions/${quizId}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data,'rrrr');
                // console.log(data[0].questionId,"quesId");
                setQuestions(data);
                // 
            })
         
            .catch((error) => {
                console.error('Error fetching questions:', error);
            });
    };
    const handleAddQuestion = () => {
        // Perform any logic to add a new question (e.g., show a form)
        console.log('Add question logic goes here');
        navigate(`/admin/quiz/${quizId}/questions/create`)
        // console.log(questionId,"qu");

    };
    const handleEditQuestion = (questionId) => {
        // Navigate to the edit page or perform any other logic
        console.log(`Edit question with ID ${questionId} logic goes here`);

        navigate(`/admin/quiz/${quizId}/questions/${questionId}/new`)
    };
    const handelCreateChoiceForm=(questionId)=>{
        console.log(questionId);
        navigate(`/admin/quiz/${quizId}/questions/${questionId}/choice`)


    }

    useEffect(()=>{
        handleDeleteQuestion()
        
    },[questionId])

    const handleDeleteQuestion = (questionId) => {
        // Perform a DELETE request to delete the question on the server
        fetch(`http://localhost:4000/api/questions/${questionId}`, {
            method: 'DELETE',  headers: {
                'Content-Type': 'application/json',
            },
             body: JSON.stringify({ quizId:quizId }),
        }
        )
            .then((response) => response.json())
            .then((data) => {
                console.log(`Question with ID ${questionId} deleted successfully`);
                // setQuestions(data)
                // After deletion, fetch the updated list of questions
                fetchQuestions();
            })
            .catch((error) => {
                console.error(`Error deleting question with ID ${questionId}:`, error);
            });
    };
    return (
        <div>
            <div className='card'>
                <div className='questions_show'>
                    <h4>Question Title</h4>
                    <button onClick={handleAddQuestion}>Add Question</button>
                </div>

                {questions.map((question) => (
                    <div key={question.id}>
                        <h4  onClick={()=>handelCreateChoiceForm(question.questionId?._id)} >{question?.questionId.title}</h4>
                       
                        <button onClick={() => handleEditQuestion(question.questionId?._id)}>Edit</button>
                        <button onClick={() => handleDeleteQuestion(question.questionId?._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Questions;
