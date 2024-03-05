import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddUserToExam = () => {
    let {examId}=useParams()
    let navigate=useNavigate()
    console.log(examId,"examId");
    const [exam, setExam] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [isExamEditable, setIsExamEditable] = useState(false);

    useEffect(() => {
        fetchUsers();
        // checkExamEditability();
        fetchExam()
    }, []);

const  handleShow=()=>{
    navigate(`/exam/${examId}/users`)
}
    const fetchExam = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/exams/${examId}`);
            // setExam(response.data);
            console.log(response,"res");
        } catch (error) {
            console.error('Error fetching exam:', error);
        }
    };


    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/users');
            setUsers(response.data);
            console.log(response.data,"dta");
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // const checkExamEditability = () => {
    //     const currentTime = new Date();
    //     // console.log(currentTime,"rrrr");
    //     const startTime = new Date(exam.start_time);
    //     const endTime = new Date(exam.end_time);

    //     if (currentTime >= startTime && currentTime <= endTime) {
    //         setIsExamEditable(false); // Cannot change data
    //     } else if (currentTime < startTime) {
    //         setIsExamEditable(true); // Can change any data
    //     } else if (currentTime > endTime) {
    //         setIsExamEditable(false); // Cannot change data
    //     }
    // };

    const handleUserSelect = (e) => {
        setSelectedUserId(e.target.value);
    };

    const handleAddUserToExam = async () => {
        try {
            await axios.post(`http://localhost:4000/api/exam/${examId}/users`, { userId: selectedUserId });
            alert('User added to exam successfully');
            navigate(`/exam/${examId}/new`)
            
            // You may want to perform additional actions after adding user to exam, like updating state or fetching updated exam data
        } catch (error) {
            console.error('Error adding user to exam:', error);
        }
    };

    return (
        <div>
            <h2>Add User to Exam</h2>

            <Button onClick={handleShow}> SHow All List</Button>
            
                <Form>
                    <FormGroup>
                        <Label for="user">Select User:</Label>
                        <Input type="select" name="user" id="user" onChange={handleUserSelect}>
                            <option value="">Select User</option>
                            {users.map((user) => (
                           
                                <option key={user._id} value={user._id}>{user.name}</option>
                              
                            ))}
                        </Input>
                    </FormGroup>
                    <Button onClick={handleAddUserToExam}>Add User to Exam</Button>
                </Form>
          
            {/* {!isExamEditable && (
                <p style={{ color: 'red' }}>You cannot add users to the exam at this time.</p>
            )} */}
        </div>
    );
};

export default AddUserToExam;





// import React, { useState, useEffect } from 'react';
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const AddUserToExam = () => {
//     let {examId}=useParams()
//     console.log(examId,"examId");
//     const [exam, setExam] = useState(null);
//     const [users, setUsers] = useState([]);
//     const [selectedUserId, setSelectedUserId] = useState('');
//     const [isExamEditable, setIsExamEditable] = useState(false);

//     useEffect(() => {
//         fetchUsers();
//         checkExamEditability();
//         fetchExam()
//     }, []);


//     const fetchExam = async () => {
//         try {
//             const response = await axios.get(`http://localhost:4000/api/exams/${examId}`);
//             // setExam(response.data);
//             console.log(response,"res");
//         } catch (error) {
//             console.error('Error fetching exam:', error);
//         }
//     };


//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/api/users');
//             setUsers(response.data);
//             console.log(response.data,"dta");
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const checkExamEditability = () => {
//         const currentTime = new Date();
//         // console.log(currentTime,"rrrr");
//         const startTime = new Date(exam.start_time);
//         const endTime = new Date(exam.end_time);

//         if (currentTime >= startTime && currentTime <= endTime) {
//             setIsExamEditable(false); // Cannot change data
//         } else if (currentTime < startTime) {
//             setIsExamEditable(true); // Can change any data
//         } else if (currentTime > endTime) {
//             setIsExamEditable(false); // Cannot change data
//         }
//     };

//     const handleUserSelect = (e) => {
//         setSelectedUserId(e.target.value);
//     };

//     const handleAddUserToExam = async () => {
//         try {
//             await axios.post(`http://localhost:4000/api/exam/${examId}/users`, { userId: selectedUserId });
//             alert('User added to exam successfully');
//             // You may want to perform additional actions after adding user to exam, like updating state or fetching updated exam data
//         } catch (error) {
//             console.error('Error adding user to exam:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Add User to Exam</h2>
//             {isExamEditable && (
//                 <Form>
//                     <FormGroup>
//                         <Label for="user">Select User:</Label>
//                         <Input type="select" name="user" id="user" onChange={handleUserSelect}>
//                             <option value="">Select User</option>
//                             {users.map((user) => (
//                                 <option key={user._id} value={user._id}>{user.name}</option>
//                             ))}
//                         </Input>
//                     </FormGroup>
//                     <Button onClick={handleAddUserToExam}>Add User to Exam</Button>
//                 </Form>
//             )}
//             {!isExamEditable && (
//                 <p style={{ color: 'red' }}>You cannot add users to the exam at this time.</p>
//             )}
//         </div>
//     );
// };

// export default AddUserToExam;
