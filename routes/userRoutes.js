const express = require('express')
const User = require('../models/User')
const userRouter = express.Router()
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



// signup 

userRouter.post('/signup', async (req, res) => {

    const { name, email, password } = req.body

    try {

        const hashedPassword = await bycrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            password: hashedPassword,
            
        })

        const result = await user.save()
        res.send({ message: 'Signup completed successfully' })

    }
    catch (err) {
        res.status(500).send({ message: err.message })

    }

})



// login 




userRouter.post('/login', async (req, res) => {

    const { name, email, password } = req.body

    try {

        const result = await User.find({ email: email })
        const hashedPassword = result[0].password
        const isValid = await bycrypt.compare(password, hashedPassword)

        if (isValid) {
            const token = jwt.sign(
                {
                    name: result[0].name,
                    id: result[0]._id
                }, process.env.JWT_SECRET, { expiresIn: '1h' }
            )
            res.status(200).json({
                "access_token": token,
                "message": "successfull"
            })

        }
        else {

            res.status(401).send({ message: 'Authentication failed' })

        }



    }
    catch (err) {
        res.status(401).send({ message: 'Authentication failed' })

    }

})











module.exports = userRouter