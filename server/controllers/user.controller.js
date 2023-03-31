const User = require('../models/user.model')
const bcrypt = require('bcrypt')

module.exports.getOne = (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

module.exports.getAll = (req, res) => {
  User.find()
    .then((allUsers) => res.json(allUsers))
    .catch((err) => res.json(err))
}

module.exports.find = (req, res) => {
  console.log('found me')
}

module.exports.updateOne = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    runValidators: true
  })
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

module.exports.deleteOne = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id })
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

async function checkExists(fieldIn, valueIn) {
  const exists = await User.exists({ [fieldIn]: valueIn })
  console.log([fieldIn + valueIn])
  if (exists !== null) {
    console.log(JSON.stringify(exists))
    return true
  } else {
    console.log(JSON.stringify(exists))
    return false
  }
}

module.exports.createOne = async (req, res) => {
  const user = {
    first: req.body.first,
    last: req.body.last,
    email: req.body.email,
    password: req.body.password
  }
  console.log(user)
  User.create(user)
    .then((item) => res.json(item))
    .catch((err) => res.json(err))
}

module.exports.login = async (req, res) => {
  //console.log("finding... ")

  var isError = false
  var messageBack = {
    name: 'ValidationError',
    message: 'Validation Failed',
    errors: {}
  }

  //console.log("they match, keep validating")
  const findUser = await User.findOne({ email: req.body.loginEmail })
  if (!findUser) {
    isError = true
    console.log('Email address not found')
    messageBack['errors']['loginEmail'] = {
      name: 'ValidationError',
      message: 'Email address not found'
    }
  } else {
    let match = await bcrypt.compare(req.body.loginPassword, findUser.password)
    if (!match) isError = true
    //console.log(JSON.stringify(isError) + " Password")
    messageBack['errors']['loginPassword'] = {
      name: 'ValidationError',
      message: 'Password is invalid'
    }
  }

  if (isError) {
    console.log('Returning error messages')
    res.status(200).json(messageBack)
  } else {
    console.log('Login Success')
    res.status(200).send('Login Success')
  }
}
