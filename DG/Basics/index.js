const { log } = require('util');
const logEvents = require('./emitterExample')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter{};

// initialize object
const myEmitter = new MyEmitter();

myEmitter.on('log', msg => logEvents(msg))

setTimeout(()=>{
    //Emit event
    myEmitter.emit('log', 'Log event emitted!')
}, 2000)