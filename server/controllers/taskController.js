const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, status } = req.body;
  const task = await Task.create({ user: req.user.id, title, status });
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

  task.title = req.body.title || task.title;
  task.status = req.body.status || task.status;
  const updatedTask = await task.save();
  res.json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (task.user.toString() !== req.user.id) return res.status(401).json({ message: 'Unauthorized' });

  await task.remove();
  res.json({ message: 'Task removed' });
};
