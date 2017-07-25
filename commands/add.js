'use strict'
const fs = require('fs');

const add = (task) => fs.readFile('./tasks.json', (err, data) => {
  if (err) {
    return err
  }
  let tasks = JSON.parse(data);
  let toDo = new Object();
  let id = () => tasks.length !== 0 ? tasks[tasks.length -1].id + 1 : 1;
  toDo.id = id();
  toDo.task = task;
  tasks.push(toDo);
  console.log('Created task ' + toDo.id + '.');
  fs.writeFile('./tasks.json', JSON.stringify(tasks));
});

module.exports = add;
