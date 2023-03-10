const express = require('express')
const checkLogin = require('../middlewares/checkLogin')
const Todo = require('../models/Todo')

const todoRouter = express.Router()


todoRouter.post('/', checkLogin, async (req, res) => {

    try {
        const todo = new Todo({
            title: req.body.title
        })
        const result = await todo.save()

        res.send('todo added')



    }
    catch (err) {
        res.send({ message: err.message })


    }




})




module.exports = todoRouter