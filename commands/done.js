'use strict'
const fs = require('fs');

const done = (num) => fs.readFile('./tasks.json', (err, data) =>{
  if (err) {
    throw err
  }
  if (num === undefined) {
    return console.log('Please provide an ID; use list to see available IDs');
  }
  let tasks = JSON.parse(data);
  let index = tasks.findIndex((task) => {
    return task.id === +num;
  })
  if (index === -1) {
    return console.log('ID ' + num + ' does not exist; use list to see available IDs');
  }
  tasks.splice(index, 1);
  console.log('Removed task ' + index)
  fs.writeFile('./tasks.json', JSON.stringify(tasks));
})

module.exports = done;
