const User = require('../models/User')

exports.listUsers = async (req, res, next) => {
  try{
    const users = await User.find().select('-password')
    res.json(users)
  }catch(err){ next(err) }
}

exports.updateUser = async (req, res, next) => {
  try{
    const { id } = req.params
    const update = req.body
    if(update.password) delete update.password // password change should go via dedicated flow
    const user = await User.findByIdAndUpdate(id, update, { new: true }).select('-password')
    res.json(user)
  }catch(err){ next(err) }
}
