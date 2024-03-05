import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const EditExam = () => {
    let navigate = useNavigate();
    console.log(useParams(),"useParamssss");

    const { examId } = useParams(); // Extract exam ID from URL params
    
    const [exam, setExam] = useState(null);
    const [quizTitles, setQuizTitles] = useState([]);
    const [editedExamData, setEditedExamData] = useState({
        start_time: '',
        end_time: '',
        quiz_id: '',
    });

    useEffect(() => {
        fetchExam();
        fetchQuizTitles();
    }, []);

    const fetchExam = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/exams/${examId}`);
            setExam(response.data);
            setEditedExamData({
                start_time: response.data.start_time,
                end_time: response.data.end_time,
                quiz_id: response.data.quiz_id._id,
            });
        } catch (error) {
            console.error('Error fetching exam:', error);
        }
    };

    const fetchQuizTitles = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/quizzes');
            console.log(response.data,"responceeeee");
            setQuizTitles(response.data);
        } catch (error) {
            console.error('Error fetching quiz titles:', error);
        }
    };

    const handleChange = (e) => {
        setEditedExamData({
            ...editedExamData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Add condition to check if start time is less than end time
        if (new Date(editedExamData.start_time) >= new Date(editedExamData.end_time)) {
            alert('Start time must be before end time');
            return;
        }

        try {
            await axios.put(`http://localhost:4000/api/exams/${examId}`, editedExamData);
            navigate('/exam/showexam'); // Redirect to exam details page after editing
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };

    return (
        <div>
            <h1>Edit Exam</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="start_time">Start Time</Label>
                    <Input type="datetime-local" name="start_time" id="start_time" value={editedExamData.start_time} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="end_time">End Time</Label>
                    <Input type="datetime-local" name="end_time" id="end_time" value={editedExamData.end_time} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="quiz_id">Quiz Title</Label>
                    <Input type="select" name="quiz_id" id="quiz_id" value={editedExamData.quiz_id} onChange={handleChange}>
                        <option value="">Select Quiz Title</option>
                        {quizTitles.map((data) => (
                            <option key={data._id} value={data._id}>{data.title}</option>
                        ))}
                    </Input>
                </FormGroup>
                <Button type="submit">Update Exam</Button>
            </Form>
        </div>
    );
};

export default EditExam;
