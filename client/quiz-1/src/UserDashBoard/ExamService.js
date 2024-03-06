// examService.js

const apiUrl = 'http://localhost:4000/api/exams'; // Example API URL

export const fetchExams = async () => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch exams');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching exams:', error.message);
        throw error;
    }
};
