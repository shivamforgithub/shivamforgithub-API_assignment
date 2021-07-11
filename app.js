const express = require('express');
const app = express();
app.use(express.json());// for accepting json objects

const { tregister, GetAllTeacher, FindTeacherByID, DeleteTeacher, updateById } = require('./controllers/teacherfunctions')
const { authenticate } = require('./middlewares/auth.js')

app.post('/tregister', tregister)

app.post('/login', authenticate)


app.get('/', GetAllTeacher)

app.get('/GetByID/:id', FindTeacherByID)

app.delete('/DeleteTeacher/:id', DeleteTeacher)

app.put('/updateById/:id', updateById)

app.listen(5000 , ()=> {
    console.log("Listening on port 5000...")});