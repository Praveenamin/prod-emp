const Employee = require('../models/Employee');

// Add IT Asset for Employee
const addEmployeeAssets = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get IT Assets of all Employees
const getEmployeeAssets = async (req, res) => {
  try {
    const assets = await Employee.find();
    res.json(assets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Employee Hardware Change Request
const requestHardwareChange = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    employee.hardwareRequests = req.body.requests;
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addEmployeeAssets, getEmployeeAssets, requestHardwareChange };

