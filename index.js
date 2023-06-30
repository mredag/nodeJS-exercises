const crypto = require('crypto');

const randomBytes = crypto.randomBytes(4).toString('hex');
console.log(randomBytes);
