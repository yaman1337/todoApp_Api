const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const isLoggedIn = require('../middlewares/requireLogin');
const User = require('../models/User');

// add task
router.post('/add', isLoggedIn, async (req, res) => {
    try {
        const { task } = req.body;
        if (!task) {
            return res.status(422).json({ error: "Add a task." })
        }
        req.user.password = undefined
        const newTask = new Task({
            task,
            user: req.user
        });
        newTask.save()
            .then(() => {
                return res.status(201).json({ message: "Task Added" });
            })
            .catch(err => console.log(err));
    }
    catch (err) { throw err }
});

// get tasks of a user
router.get('/', isLoggedIn, (req, res) => {
    try {
        Task.find({ user: req.user._id })
            .populate('user', '_id name')
            .then(data => {
                res.status(200).json(data);
            })
    }
    catch (err) {
        console.log(err)
    }
});

router.delete('/delete/:id', isLoggedIn, async (req, res) => {
    try {
        const { id } = req.params;
        const delTask = await Task.findById(id);
        console.log(req.user._id)
        console.log(delTask.user._id)
        delTask.delete()
            .then(() => {
                res.status(200).json({ message: "Successfully deleted." })
            })
    }
    catch (err) {
        throw err
    }
})

module.exports = router;