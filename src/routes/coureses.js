const Joi = require('joi')
const express = require('express')
const Courses = require('../models/courses')


const route = new express.Router()

route.get('/api/courses', async (req, res) => {

    try {
        const courses = await Courses.find()
        if (!courses) {
            return res.status(404).send("not found")
        }

        res.send(courses)

    }
    catch (error) {
        res.status(400).send()
    }
})

route.get('/api/courses/:id', async (req, res) => {
    try {
        const course = await Courses.findOne({ _id: req.params.id })
        if (!course) {
            return res.status(404).send("not found")
        }

        res.send(course)

    } catch (error) {
        res.status(400).send()
    }

})

route.post('/api/courses', async (req, res) => {

    try {
        const { error } = courseValidator(req.body)

        if (error) return res.status(400).send(error.details[0].message)

        const course = new Courses(req.body)
        await course.save()

        res.status(201).send(course)

    }
    catch (error) {
        res.status(400)

    }
})

route.patch('/api/courses/:id', async (req, res) => {
    try {

        const allowedUpdates = ["name", "author"]
        const updates = Object.keys(req.body)
        const isAllowed = updates.every(update => allowedUpdates.includes(update))

        if (!isAllowed) {
            return res.status(400).send("incorrect params")
        }
        const course = await Courses.findOne({ _id: req.params.id })
        if (!course) {
            return res.status(404).send("not found")
        }

        updates.forEach(update => course[update] = req.body[update])
        await course.save()
        res.send(course)

    }
    catch (error) {
        res.status(400).send("hello")
    }
})

route.delete('/api/courses/:id', async (req, res) => {
   

        try{
            const course = await Courses.findOne({ _id: req.params.id })
        if (!course) {
            return res.status(404).send("not found")
        }

        
        res.send()
        }
        catch(error)
        {
            res.status(404).send()
        }
    
})

const courseValidator = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().required()
    })

    return schema.validate(course)
}

module.exports = route