// roleRoutes.js

const express = require('express');
const router = express.Router();
const Role = require('../models/role');

// Create Role
router.post('/roles', async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    console.error('Error creating role:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all Roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    console.error('Error getting roles:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get Role by ID
router.get('/roles/:id', async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error('Error getting role by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update Role by ID
router.put('/roles/:id', async (req, res) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json(role);
  } catch (error) {
    console.error('Error updating role by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete Role by ID
router.delete('/roles/:id', async (req, res) => {
  try {
    const role = await Role.findByIdAndRemove(req.params.id);
    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }
    res.json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
