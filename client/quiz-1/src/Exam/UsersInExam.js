import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate,useParams} from 'react-router-dom'
const UsersInExam = () => {
    // console.log(useParams(),"users");
    let {examId}=useParams()

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsersInExam();
    }, [examId]);

    const fetchUsersInExam = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/exam/${examId}/users`);
            console.log(response.data);
            setUsers(response.data);
          
        } catch (error) {
            console.error('Error fetching users in exam:', error);
        }
    };

    return (
        <div>
            <h2>Users Enrolled in Exam</h2>
            
            <ul>
                {users.map(user => (
                   <div>  
                
                    <li key={user._id}>{user.name}</li>
                    </div>
                   
                ))}
            </ul>
        </div>
    );
};

export default UsersInExam;
