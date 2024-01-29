// services/questionService.js

const API_URL = 'http://localhost:4000';

export const addQuestion = async (newQuestion) => {
    // const token = localStorage.getItem('token'); // Assuming you store the admin token in local storage

    try {
        const response = await fetch(`${API_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Authorization: token,
            },
            body: JSON.stringify(newQuestion),
        });

        if (!response.ok) {
            throw new Error('Failed to add question');
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
