// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');

// // Create a new user
// router.post('/users', async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get all users
// router.get('/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Get a specific user by ID
// router.get('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       res.status(404).json({ error: 'User not found' });
//       return;
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Update a user by ID
// router.put('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!user) {
//       res.status(404).json({ error: 'User not found' });
//       return;
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Delete a user by ID
// router.delete('/users/:id', async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       res.status(404).json({ error: 'User not found' });
//       return;
//     }
//     res.status(204).send();
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
