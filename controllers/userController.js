const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.renderEmployeePage = async (req, res) => {
  try {
    const employees = await User.find({}, 'username role createdAt');
    res.render('employeeList', { employees, error: null });
  } catch (err) {
    res.status(500).send('Error loading employees: ' + err.message);
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed, role: 'user' });
    res.redirect('/admin/employees');
  } catch (err) {
    const employees = await User.find({}, 'username role createdAt');
    res.render('employeeList', { employees, error: 'Username already exists or invalid input' });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin/employees');
  } catch (err) {
    res.status(500).send('Error deleting employee: ' + err.message);
  }
};
