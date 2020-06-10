'use strict';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = 'QeThWmZq4t7w!z%C*F-JaNdRgUjXn2r5';
const iv = 'PeShVmYq3t6w9z$C';

function encrypt(text) {
	let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
	let encrypted = cipher.update(text);
	encrypted = Buffer.concat([encrypted, cipher.final()]);
	return encrypted.toString('hex');
}

module.exports = encrypt;