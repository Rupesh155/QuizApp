// AdminPanel.js

import React, { useState } from 'react';
import './Admin.css'
import { addQuestion } from './QuestionService'; 
// Create a questionService for handling question-related API calls


const AdminPanel = () => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '', '', '']);
    const [correctOption, setCorrectOption] = useState(0);

    const handleOptionChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleSubmit = async () => {
        const newQuestion = {
            question,
            options,
            correctOption,
        };

        try {
            await addQuestion(newQuestion);
            console.log('Question added successfully');
            // Clear form after successful submission
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectOption(0);
        } catch (error) {
            console.error('Error adding question:', error.message);
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <div>
                <label>Question:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div>
                <label>Options:</label>
                {options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <div>
                <label>Correct Option:</label>
                <select value={correctOption} onChange={(e) => setCorrectOption(e.target.value)}>
                    {options.map((option, index) => (
                        <option key={index} value={index}>
                            {`Option ${index + 1}`}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleSubmit}>Add Question</button>
        </div>
    );
};

export default AdminPanel;
