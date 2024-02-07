// import React, { useState, useEffect } from 'react';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import {useNavigate} from 'react-router-dom'
// import axios from 'axios';

// const Exam = () => {
//     const navigate = useNavigate();
//     const [exams, setExams] = useState([]);
//     // console.log(exams,"examnnn11111");
//     const [quizTitles, setQuizTitles] = useState([]); // State to hold quiz titles

//     const [newExamData, setNewExamData] = useState({
//         start_time: '',
//         end_time: '',
//         quiz_id: '',
//     });
//     console.log(newExamData,"newExamData");
//     // const [editable, setEditable] = useState(false);

//     useEffect(() => {
//         fetchExams();
//         fetchQuizTitles(); // Fetch quiz titles when the component mounts
//     }, []);

//     const fetchExams = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/api/exams');
//             setExams(response.data);
//             //   console.log(response.data);
//         } catch (error) {
//             console.error('Error fetching exams:', error);
//         }
//     };

//     const fetchQuizTitles = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/api/quizzes'); // Assuming you have an endpoint to fetch quizzes
//             console.log(response.data, "ress");
//               setQuizTitles(response.data)
//             // setQuizTitles(response.data.map(quiz => quiz.title));
//               console.log(quizTitles,"questitle");
//             // Extract quiz titles from resonse data
//         } catch (error) {
//             console.error('Error fetching quiz titles:', error);
//         }
//     };

//     const handleChange = (e) => {
//         setNewExamData({
//             ...newExamData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:4000/api/exams', newExamData);
//             setExams([...exams, response.data]);
//             console.log(exams,"examnnn");
//             setNewExamData({
//                 start_time: '',
//                 end_time: '',
//                 quiz_id: '',
//             });
//         } catch (error) {
//             console.error('Error creating exam:', error);
//         }
//     };

//     const handleDelete = async (id) => {
//         // console.log(id,"ididd");
//         try {
//             await axios.delete(`http://localhost:4000/api/exams/${id}`);
//             setExams(exams.filter((exam) => exam._id !== id));
//         } catch (error) {
//             console.error('Error deleting exam:', error);
//         }
//     };

//     const handleEdit= (id)=>{
//         navigate(`/exam/edit/${id}`)




//     }



//       const isExamEditable = (exam) => {
//     const currentTime = new Date();
//     const startTime = new Date(exam.start_time);
//     const endTime = new Date(exam.end_time);

//     // Case 1: Exam has started
//     if (currentTime >= startTime && currentTime <= endTime) {
//       return false; // Cannot change data
//     }

//     // Case 2: Exam has not started yet
//     if (currentTime < startTime) {
//       return true; // Can change any data
//     }

//     // Case 3: Exam has ended
//     if (currentTime > endTime) {
//       return false; // Cannot change data
//     }
//   };


//     return (
//         <div>
//             <h1>Exams</h1>
//             <Form onSubmit={handleSubmit}>
//                 <FormGroup>
//                     <Label for="start_time">Start Time</Label>
//                     <Input type="datetime-local" name="start_time" id="start_time" value={newExamData.start_time} onChange={handleChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="end_time">End Time</Label>
//                     <Input type="datetime-local" name="end_time" id="end_time" value={newExamData.end_time} onChange={handleChange} required />
//                 </FormGroup>
//                 <FormGroup>
//                     <Label for="quiz_id">Quiz Title</Label>

//                     <Input type="select" name="quiz_id" id="quiz_id" value={newExamData.quiz_id} onChange={handleChange} >
//                         <option value="">Select Quiz Title</option>
//                         {quizTitles.map((data, index) => {
//                             return (<>

//                                 <option key={index} value={data._id}>{data?.title}</option>
//                             </>)
//                         })}

//                     </Input>
//                 </FormGroup>
//                 <Button type="submit">Add Exam</Button>
//             </Form>
//             <ul>
//                 {exams?.map((exam) => (
//                     <li key={exam._id}>
//                         <p>Start Time: {exam.start_time}</p>
//                         <p>End Time: {exam.end_time}</p>
//                         <p>Quiz Title: {exam.quiz_id.title}</p>
//                         <p>Quiz Id: {exam.quiz_id._id}</p>
//                          {
//                             isExamEditable(exam) ? (
//                                 <div>
//                         <Button color="danger" onClick={() => handleDelete(exam._id)}>Delete</Button>
//                         <Button color="danger" onClick={() => handleEdit(exam._id)}>Edit</Button>

//                                 </div>

//                             ):(
//                                 <div>
//                                     <p style={{color:'red'}}>   Exam is in progress or has ended . You cannot change data.</p>
//                                 </div>
//                             )
//                          }

//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Exam;




import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Exam = () => {
   let navigate=   useNavigate()
    const [exams, setExams] = useState([]);
    const [quizTitles, setQuizTitles] = useState([]);
    const [newExamData, setNewExamData] = useState({
        start_time: '',
        end_time: '',
        quiz_id: '',
    });
    const [editingExamId, setEditingExamId] = useState(null);

    useEffect(() => {
        fetchExams();
        fetchQuizTitles();
    }, []);


    // const ShowUsers=(examId)=>{
    //     navigate(`/exam/${examId}/users`)
    // }


    const handleAddUsers=(examId)=>{
        console.log(examId,"eeeeeee");
        navigate(`/exam/${examId}/new`)

    }

    const fetchExams = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/exams');
            setExams(response.data);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const fetchQuizTitles = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/quizzes');
            setQuizTitles(response.data);
            console.log(response.data,"data");
        } catch (error) {
            console.error('Error fetching quiz titles:', error);
        }
    };

    const handleChange = (e) => {
        setNewExamData({
            ...newExamData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/exams', newExamData);
            setExams([...exams, response.data]);
            setNewExamData({
                start_time: '',
                end_time: '',
                quiz_id: '',
            });
        } catch (error) {
            console.error('Error creating exam:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/api/exams/${id}`);
            setExams(exams.filter((exam) => exam._id !== id));
        } catch (error) {
            console.error('Error deleting exam:', error);
        }
    };

    const handleEdit = (exam) => {
        setEditingExamId(exam._id);
        setNewExamData({
            start_time: exam.start_time,
            end_time: exam.end_time,
            quiz_id: exam.quiz_id._id,
        });
    };

    const handleCancelEdit = () => {
        setEditingExamId(null);
        setNewExamData({
            start_time: '',
            end_time: '',
            quiz_id: '',
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/api/exams/${editingExamId}`, newExamData);
            setEditingExamId(null);
            setNewExamData({
                start_time: '',
                end_time: '',
                quiz_id: '',
            });
            fetchExams();
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };

    const isExamEditable = (exam) => {
        const currentTime = new Date();
        const startTime = new Date(exam.start_time);
        const endTime = new Date(exam.end_time);

        if (currentTime >= startTime && currentTime <= endTime) {
            return false; // Cannot change data
        }

        if (currentTime < startTime) {
            return true; // Can change any data
        }

        if (currentTime > endTime) {
            return false; // Cannot change data
        }
    };

    return (
        <div>
            <h1>Exams</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="start_time">Start Time</Label>
                    <Input type="datetime-local" name="start_time" id="start_time" value={newExamData.start_time} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="end_time">End Time</Label>
                    <Input type="datetime-local" name="end_time" id="end_time" value={newExamData.end_time} onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="quiz_id">Quiz Title</Label>
                    <Input type="select" name="quiz_id" id="quiz_id" value={newExamData.quiz_id} onChange={handleChange}>
                        <option value="">Select Quiz Title</option>
                        {quizTitles.map((data) => (
                            <option key={data._id} value={data._id}>{data.title}</option>
                        ))}
                    </Input>
                </FormGroup>
                <Button type="submit">Add Exam</Button>
            </Form>
            <ul>
                {exams?.map((exam) => (
                    <li key={exam._id}  >
                        <p>Start Time: {exam.start_time}</p>
                        <p>End Time: {exam.end_time}</p>
                        <p>Quiz Title: {exam.quiz_id.title}</p>
                        <p>Quiz Id: {exam.quiz_id._id}</p>
                        {editingExamId === exam._id ? (
                            <div>
                                <Button color="primary" onClick={handleUpdate}>Update</Button>{' '}
                                <Button color="secondary" onClick={handleCancelEdit}>Cancel</Button>
                            </div>
                        ) : (
                            <div>
                                {isExamEditable(exam) && (
                                    <>
                                        <Button color="danger" onClick={() => handleDelete(exam._id)}>Delete</Button>{' '}
                                        <Button color="info" onClick={() => handleEdit(exam)}>Edit</Button>
                                        <Button color="info" onClick={() => handleAddUsers(exam._id)}>Add User</Button>

                                    </>
                                )}
                                {!isExamEditable(exam) && (
                                    <p style={{ color: 'red' }}>Exam is in progress or has ended. You cannot change data.</p>
                                )}
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Exam;
