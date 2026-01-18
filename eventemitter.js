// Import the core `events` module which provides the `EventEmitter` class.
const events=require('events');

// Create a new event emitter that we can register listeners on and emit events from.
const eventEmitter=new events.EventEmitter();

// Listener function that will log out the provided message and status when invoked.
function logger(message,status){
    console.log(`hi ${message},status is ${status}`)
}

// Register the `logger` listener for the `bb` event so it runs whenever `bb` is emitted.
eventEmitter.on('bb',logger);

// Trigger the `bb` event immediately with the provided arguments, calling the registered listeners.
eventEmitter.emit('bb','Boopathi',200)