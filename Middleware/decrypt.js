'use strict';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = 'QeThWmZq4t7w!z%C*F-JaNdRgUjXn2r5';
const iv = 'PeShVmYq3t6w9z$C';

function decrypt(text) {
    let encryptedText = Buffer.from(text, 'hex');
	let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
	let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

module.exports = decrypt;

