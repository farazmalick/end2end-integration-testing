const request = require('supertest')
const Courses = require('../models/courses')
const Coureses = require('../models/courses')
let server

const testCourse = { name: "Book", author: "unknown" }

describe("/api/courses", () => {
    beforeEach(() => { server = require('../index') })
    afterEach(async () => { await server.close(); })
    describe("/get", () => {

        it("valid request should return a status code 200 ", async () => {

            const res = await request(server).get('/api/courses')

        })

    })

    describe("/get/:id", () => {

        it("valid request should return a status code 200 ", async () => {

            const course = new Coureses(testCourse)
            await course.save()
            const res = await request(server).get(`/api/courses/${course._id}`)
            expect(res.statusCode).toBe(200)
            await Courses.findByIdAndRemove(course._id)


        })

        it("invalid Id should return a status code 400 ", async () => {

            const res = await request(server).get(`/api/courses/1`)
            expect(res.statusCode).toBe(400)

        })

    })

    describe("/post", () => {

        it("valid request should return a status code 201 ", async () => {

            const res = await request(server).post(`/api/courses`).send(testCourse)
            expect(res.statusCode).toBe(201)
            await Courses.findByIdAndRemove(res.body._id)


        })

        it("invalid request should return a status code 400 ", async () => {

            const res = await request(server).post(`/api/courses`).send({ author: "unknown" })
            expect(res.statusCode).toBe(400)


        })

    })

    describe("delete/:id", () => {

        it("valid request should return a status code 200 ", async () => {

            const course = new Coureses(testCourse)
            await course.save()
            const res = await request(server).delete(`/api/courses/${course._id}`)
            expect(res.statusCode).toBe(200)
            await Courses.findByIdAndRemove(course._id)


        })

        it("invalid Id should return a status code 404 ", async () => {

            const res = await request(server).delete(`/api/courses/1`)
            expect(res.statusCode).toBe(404)

        })

    })

    describe("Update/:id", () => {

        it("valid request should return a status code 200 ", async () => {

            const course = new Coureses(testCourse)
            await course.save()
            const res = await request(server).patch(`/api/courses/${course._id}`).send({ name: 'ali' })
            expect(res.statusCode).toBe(200)
            await Courses.findByIdAndRemove(course._id)


        })

        it("invalid Id should return a status code 404 ", async () => {

            const course = new Coureses(testCourse)
            await course.save()
            const res = await request(server).patch(`/api/courses/${course._id}1`).send({ nam: 'ali' })
            expect(res.statusCode).toBe(400)
        })

    })

})