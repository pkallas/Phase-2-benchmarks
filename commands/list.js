'use strict'
const fs = require('fs');
const print = require('node-print');

const list = () => fs.readFile('./tasks.json', (err, data) => {
  if (err) {
    return err
  }
  let tasks = JSON.parse(data);
  print.pt(tasks);
  if (tasks.length !== 0) {
    console.log(tasks[tasks.length - 1].id + ' tasks');
  }
})

module.exports = list;
