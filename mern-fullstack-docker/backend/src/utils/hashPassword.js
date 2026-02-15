const bcrypt = require('bcryptjs')

exports.hash = async (plain) => await bcrypt.hash(plain, 10)
exports.compare = async (plain, hashed) => await bcrypt.compare(plain, hashed)
