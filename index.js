const express = require('express')
const dbConnection = require('./dbConnection')
const todoRouter = require('./routes/todo.route')
const userRouter = require('./routes/userRoutes')
const app = express()


require('dotenv').config()
app.use(express.json())

app.use('/user', userRouter)
app.use('/todo', todoRouter)





app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
    dbConnection()
})






