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




const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');
const User = require('../models/users');

// Add a user to a particular exam
// Add a user to a particular exam
const ExamUser = require('../models/examUser'); // Import the ExamUser model
router.post('/exam/:examId/users', async (req, res) => {
  const { examId } = req.params;
  const { userId } = req.body;

  try {
    // Check if the user is already enrolled in the exam
    const existingExamUser = await ExamUser.findOne({ exam_id: examId, user_id: userId });
    if (existingExamUser) {
      return res.status(400).json({ error: 'User is already enrolled in the exam' });
    }

    // Create a new examUser object with the examId and userId
    const examUser = new ExamUser({
      exam_id: examId,
      user_id: userId,
    });

    // Save the examUser object to the database
    await examUser.save();

    res.status(201).json({ message: 'User added to exam successfully' });
  } catch (error) {
    console.error('Error adding user to exam:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});












// router.post('/exam/:examId/users', async (req, res) => {
//     const { examId } = req.params;
//     const { userId } = req.body;
  
//     try {
//       // const exam = await Exam.findById(examId);
//       // if (!exam) {
//       //   return res.status(404).json({ error: 'Exam not found' });
//       // }
  
//       // Check if the user is already enrolled in the exam
//       // if (exam.users.includes(userId)) {
//       //   return res.status(400).json({ error: 'User is already enrolled in the exam' });
//       // }
  
//       // const user = await User.findById(userId);
//       // if (!user) {
//       //   return res.status(404).json({ error: 'User not found' });
//       // }
  
//       // Add the user to the exam's list of users
//       exam.users.push(userId);
//       await exam.save();
  
//       res.status(201).json({ message: 'User added to exam successfully' });
//     } catch (error) {
//       console.error('Error adding user to exam:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  
// Retrieve all users enrolled in a particular exam
router.get('/exam/:examId/users', async (req, res) => {
  const { examId } = req.params;

  try {
    const examUsers = await ExamUser.find({ exam_id: examId }).populate('user_id');
    if (!examUsers) {
      return res.status(404).json({ error: 'Exam not found' });
    }
      let examD=   examUsers.map((data)=>{
        return data.user_id

    })

    res.json(examD);
  } catch (error) {
    console.error('Error getting users in exam:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update details of a user enrolled in a particular exam (if necessary)

// Remove a user from a particular exam
router.delete('/exam/:examId/users/:userId', async (req, res) => {
  const { examId, userId } = req.params;

  try {
    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ error: 'Exam not found' });
    }

    // Remove the user from the exam's list of users
    exam.users.pull(userId);
    await exam.save();

    res.json({ message: 'User removed from exam successfully' });
  } catch (error) {
    console.error('Error removing user from exam:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
