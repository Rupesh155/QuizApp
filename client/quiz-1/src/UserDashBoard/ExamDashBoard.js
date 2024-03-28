import React, { useState, useEffect } from 'react';
import { fetchExams } from './ExamService'; // Assuming you have a service for fetching exams
import { useNavigate } from 'react-router-dom';

const ExamDashboard = () => {
      let navigate= useNavigate()
    const [exams, setExams] = useState([]);
    const [filteredExams, setFilteredExams] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        // Fetch the list of exams when the component mounts
        fetchExams()
            .then((data) => {
                console.log(data,"rr");
                setExams(data);
                setFilteredExams(data);
            })
            .catch((error) => {
                console.error('Failed to fetch exams:', error);
            });
    }, []);

    const showPappr=(id)=>{
        navigate(`/examInterface/${id}`)

    }

    const handleSortOrderChange = (order) => {
        setSortOrder(order);
        const sortedExams = [...exams].sort((a, b) => {
            const nameA = a?.quiz_id?.title || '';
            const nameB = b?.quiz_id?.title || '';
            return order === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
        setFilteredExams(sortedExams.filter(exam => new Date(exam.start_time) > new Date()));
    };
    

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            setFilteredExams((prevExams) =>
                prevExams.map((exam) => ({
                    ...exam,
                    shouldStart: new Date(exam.start_time) <= now && now < new Date(exam.end_time),
                }))
            );
        }, 1000); // Check every second
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Exam Dashboard</h1>
            <div>
                <label>Sort Order:</label>
                <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
            </div>
            {filteredExams.length === 0 ? (
                <p>No exams available</p>
            ) : (
                <ul>
                    {filteredExams.map((exam) => (
                        <li key={exam.id}>
                            <p>{exam?.quiz_id?.title}</p>
                            <p>{exam.start_time} - {exam.end_time}</p>
                            {exam.shouldStart && <button   onClick={()=>showPappr(exam._id)}>Start Exam</button>}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ExamDashboard;
