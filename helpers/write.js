const express = require('express')
const fs = require('fs');

function write(path, data) {
    return new Promise(function (resolve, reject) {
        console.log(path)
        fs.writeFile(path, JSON.stringify(data), err => {
            if (err) {
                console.log("error occured")
                reject();
            }
            else{
                console.log("Data saved!")
                resolve();
            }
        })
    })


}



module.exports = { write }