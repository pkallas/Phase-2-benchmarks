'use strict'
const add = require('./commands/add')
const list = require('./commands/list')
const done = require('./commands/done')


switch(process.argv[2]){
  case 'add':
    add(process.argv[3])
    break;

  case 'list':
    list(process.argv[3])
    break;

  case 'done':
    done(process.argv[3])
    break;

  default:
  console.log('Please enter command after task.')
  console.log('Commands are add, list, and done')
}
