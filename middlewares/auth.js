const fs = require('fs')
const express = require('express')
let datafile = []
fs.readFile('/home/shivam/assign/teacher.json', 'utf-8', function (err, data) {
	datafile = JSON.parse(data)
	if (err) {
		res.send("Error occured")
	}
})

const authenticate = (req, res) => {
	const pass = req.body.pass;
	const id = req.body.ID;
	const teacherInfo = datafile.find(teachers => (teachers.ID === id && teachers.pass === pass));

	if (!teacherInfo) {
		res.send("No teacher found with this id")
	}
	else{
		console.log(teacherInfo)
		res.send("authentication done!")
	}
		

}

	module.exports = { authenticate }