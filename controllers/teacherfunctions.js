const fs = require('fs')
const Joi = require('joi')
const { validation } = require('../middlewares/validation.js')
const { express } = require('express');
const { write } = require('../helpers/write')

const path = '/home/shivam/assign/teacher.json'
/*const data = read(path)
if(!data)
	console.log("Error occured")
console.log(data);*/
let filedata = [];

fs.readFile( '/home/shivam/assign/teacher.json' ,'utf-8', function (err, data) {
	if(err){
		console.log("error occured")
		console.log(__dirname)
		console.log(err)
	}
	else{
	filedata = JSON.parse(data);
	}
});
console.log(filedata[0])
const tregister = (req, res) => {
	const teacher = req.body;
	const teacher_schema = Joi.object({
		Name: Joi.string().min(3).required(),
		pass: Joi.string().min(8).required(),
		email: Joi.string().required(),
		ID: Joi.number().integer().min(111708001).max(111708074).required()
	});

	const { error } = validation(teacher_schema, teacher);
	if (!error) {
		filedata.push(teacher);
		write(path, filedata).then(res.send("Data written well!")).catch(res.send("Some error occured"))
	}
	else
		if (error) return res.status(400).send(error.details[0].message);

}

const GetAllTeacher = (req, res) => {
	res.send(filedata);
}

const FindTeacherByID = (req, res) => {
	console.log(parseInt(req.params.id))
	const teacherInfo = filedata.find(teachers => {
		console.log(teachers.ID);
		return teachers.ID === parseInt(req.params.id)
	})
	console.log(teacherInfo)
	if (!teacherInfo) {
		res.send("No teacher found with this id")
	}
	res.status(200).json(teacherInfo)
}

const DeleteTeacher = async (req, res) => {
	const teacher = filedata.find(teachers => teachers.ID === parseInt(req.params.id))
	const index = filedata.indexOf(teacher)
	filedata.splice(index, 1);
	write(path, filedata)
	res.send(teacher)

}

const updateById = (req, res) => {
	const object = req.body
	const teacher = filedata.find(teachers => teachers.ID === parseInt(req.params.id))
	const index = filedata.indexOf(teacher)
	filedata[index] = {
		...object
	}
	write(path, filedata)
	res.send("Done")
}
module.exports = { tregister, GetAllTeacher, FindTeacherByID, DeleteTeacher, updateById }
