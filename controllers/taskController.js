const Task = require('../models/Task');
const User = require('../models/User');
const Category = require('../models/Category');

exports.listTasks = async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user.id };
    const tasks = await Task.find(filter).populate('category').populate('user', 'username');
    res.render('taskList', { tasks });
  } catch (err) {
    res.status(500).send('Error loading tasks: ' + err.message);
  }
};

exports.showTaskForm = async (req, res) => {
  try {
    const categories = await Category.find();
    let task = null;
    let users = [];

    if (req.params.id) {
      task = await Task.findById(req.params.id);
      if (!task) return res.status(404).send('Task not found');
      if (req.user.role !== 'admin' && String(task.user) !== req.user.id) {
        return res.status(403).send('Access denied');
      }
    }

    // Only admin needs the list of employees to assign a task to
    if (req.user.role === 'admin') {
      users = await User.find({}, 'username role');
    }

    res.render('taskForm', { task, categories, users, currentUser: req.user });
  } catch (err) {
    res.status(500).send('Error loading form: ' + err.message);
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, category, assignedUser } = req.body;

    // Admin can assign the task to any employee; regular user can only create for self
    const ownerId = (req.user.role === 'admin' && assignedUser) ? assignedUser : req.user.id;

    const task = await Task.create({
      title,
      description,
      status,
      category: category ? category : undefined,
      user: ownerId
    });
    await User.findByIdAndUpdate(ownerId, { $push: { tasks: task._id } });
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Error creating task: ' + err.message);
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    if (req.user.role !== 'admin' && String(task.user) !== req.user.id) {
      return res.status(403).send('Access denied');
    }

    if (req.user.role === 'admin') {
      // Admin can edit everything, including reassigning to another employee
      const { title, description, status, category, assignedUser } = req.body;
      const updateData = { title, description, status, category: category ? category : undefined };

      if (assignedUser && String(assignedUser) !== String(task.user)) {
        await User.findByIdAndUpdate(task.user, { $pull: { tasks: task._id } });
        await User.findByIdAndUpdate(assignedUser, { $push: { tasks: task._id } });
        updateData.user = assignedUser;
      }
      await Task.findByIdAndUpdate(req.params.id, updateData);
    } else {
      // Employee can ONLY update the status of their own task
      await Task.findByIdAndUpdate(req.params.id, { status: req.body.status });
    }

    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Error updating task: ' + err.message);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send('Task not found');
    if (req.user.role !== 'admin' && String(task.user) !== req.user.id) {
      return res.status(403).send('Access denied');
    }
    await Task.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(task.user, { $pull: { tasks: task._id } });
    res.redirect('/tasks');
  } catch (err) {
    res.status(500).send('Error deleting task: ' + err.message);
  }
};
