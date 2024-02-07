// // examUserRoutes.js

// const express = require('express');
// const router = express.Router();
// const ExamUser = require('../models/examUser');

// // Create ExamUser
// router.post('/examUsers', async (req, res) => {
//   try {
//     const examUser = new ExamUser(req.body);
//     await examUser.save();
//     res.status(201).json(examUser);
//   } catch (error) {
//     console.error('Error creating examUser:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get all ExamUsers
// router.get('/examUsers', async (req, res) => {
//   try {
//     const examUsers = await ExamUser.find();
//     res.json(examUsers);
//   } catch (error) {
//     console.error('Error getting examUsers:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get ExamUser by ID
// router.get('/examUsers/:id', async (req, res) => {
//   try {
//     const examUser = await ExamUser.findById(req.params.id);
//     if (!examUser) {
//       return res.status(404).json({ error: 'ExamUser not found' });
//     }
//     res.json(examUser);
//   } catch (error) {
//     console.error('Error getting examUser by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Update ExamUser by ID
// router.put('/examUsers/:id', async (req, res) => {
//   try {
//     const examUser = await ExamUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!examUser) {
//       return res.status(404).json({ error: 'ExamUser not found' });
//     }
//     res.json(examUser);
//   } catch (error) {
//     console.error('Error updating examUser by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Delete ExamUser by ID
// router.delete('/examUsers/:id', async (req, res) => {
//   try {
//     const examUser = await ExamUser.findByIdAndRemove(req.params.id);
//     if (!examUser) {
//       return res.status(404).json({ error: 'ExamUser not found' });
//     }
//     res.json({ message: 'ExamUser deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting examUser by ID:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
// const Exam = require('../models/exam'); // Assuming you have a model for exams
// const User = require('../models/users'); // Assuming you have a model for users
const ExamUser = require('../models/examUser');


// Create (POST): Add a user to a particular exam
router.post('/exam/:examId/users', async (req, res) => {
    const { examId } = req.params;
    const { userId } = req.body;

    try {
        const exam = await ExamUser.findById(examId).populate('Exam');
        console.log(exam,"rr");
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        const user = await exam.findById(userId);
        console.log(user,"user");
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

      // await   exam.create()
     let  userExaam=   new ExamUser({
          ...req.body
        })

        await userExaam.save();

        res.status(201).json({ message: 'User added to exam successfully' });
    } catch (error) {
        console.error('Error adding user to exam:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Read (GET): Retrieve all users enrolled in a particular exam
router.get('/exam/:examId/users', async (req, res) => {
    const { examId } = req.params;

    try {
        const exam = await Exam.findById(examId).populate('users');
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        res.json(exam.users);
    } catch (error) {
        console.error('Error getting users in exam:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update (PUT): Update details of a user enrolled in a particular exam (if necessary)
// For example, you might want to update the user's role or status in the exam

// Delete (DELETE): Remove a user from a particular exam
router.delete('/exam/:examId/users/:userId', async (req, res) => {
    const { examId, userId } = req.params;

    try {
        const exam = await Exam.findById(examId);
        if (!exam) {
            return res.status(404).json({ error: 'Exam not found' });
        }

        const userIndex = exam.users.findIndex(user => user.toString() === userId);
        if (userIndex === -1) {
            return res.status(404).json({ error: 'User not found in exam' });
        }

        exam.users.splice(userIndex, 1);
        await exam.save();

        res.json({ message: 'User removed from exam successfully' });
    } catch (error) {
        console.error('Error removing user from exam:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
