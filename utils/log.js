function success(message) {
    console.log(`%c ${message}`, 'color: #a7ff8c');
}

function severe(message) {
    console.log(`%c ${message}`, 'color: red');
}

function err(message) {
    console.log(`%c ${message}`, 'color: #ff455b');
}

function warn(message) {
    console.log(`%c ${message}`, 'color: #ffad42');
}

function info(message) {
    console.log(`%c ${message}`, 'color: #42adff');
}

export const log = {success, severe, err, warn, info};