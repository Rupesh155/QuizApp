
import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ShowExam = () => {
    const [exams, setExams] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchExams();
    }, []);

    const fetchExams = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/exams');
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const handleEdit = (examId) => {
        navigate(`/exam/edit/${examId}`);
    };
    const handleAdd = (examId) => {
        navigate(`/exam/edit/${examId}`);
    };
    const handelAddUser=(examId)=>{
        navigate(`/exam/${examId}/new`)

    }

    const handleDelete = async (examId, startTime, endTime) => {
        const currentTime = new Date();

        // Case 1: If exam has started, prevent deletion
        if (currentTime >= new Date(startTime)) {
            alert('Exam has already started. You cannot delete it.');
            return;
        }

        // Case 2: If exam has ended, prevent deletion
        if (currentTime > new Date(endTime)) {
            alert('Exam has ended. You cannot delete it.');
            return;
        }

        // Perform deletion if conditions are met
        try {
            await axios.delete(`http://localhost:4000/api/exams/${examId}`);
            // Update exams list after deletion
            fetchExams();
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };

    return (
        <div>
            <h1>Exams List</h1>
        
           <Link to='/exam'>Add Exam </Link>
            <ul>
         
                {exams.map((exam) => (
                    <li key={exam._id}>
                        <div onClick={()=>handelAddUser(exam._id)}>  
                        <p>Start Time: {exam.start_time}</p>
                        <p>End Time: {exam.end_time}</p>
                        <p>Quiz Title: {exam.quiz_id?.title}</p>
                        <p>Quiz ID: {exam.quiz_id?._id}</p>
                        </div>
                        <Button color="info" onClick={() => handleEdit(exam._id)}>Edit</Button>
                        <Button color="danger" onClick={() => handleDelete(exam._id, exam.start_time, exam.end_time)}>Delete</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ShowExam;
