const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = (req, res, next) => {
  const { username, password, phoneNumber } = req.body;
  if (!phoneNumber || !username || !password){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
  if(isNaN(phoneNumber)){
    res.status(400).json({ message: 'Phone Number must be a number'})
  }
  User.findOne({ phoneNumber },  (error, user) => {
    if(user){
      res.status(400).json({ message: 'User already exists, please Login' })
    } else {
      const hash = bcrypt.hashSync(
        password,
        10
      );

      let user = new User({
        username,
        phoneNumber,
        password: hash
      });

      user.save((error) =>  {
        if(error){
          res.status(500).json({message: 'There was an error'})
        } else {
          res.status(201).json({message: 'User successfully created', user })
        }
      })
    }
  })
};

const login = async (req, res, next) => {
  const { password, phoneNumber } = req.body;
  if (!phoneNumber || !password){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
  const user = await User.find({ phoneNumber }).exec();

  if(user.length){
    const match = await bcrypt.compare(password, user[0].password);
    if(match){
      const token = jwt.sign({
          username: user[0].username,
          phoneNumber: user[0].phoneNumber
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      res.status(200).json({ accessToken: token })
    } else {
      res.status(400).json({ message: 'An error occurred while logging in' })
    }
  } else {
    res.status(400).json({ message: 'An error occurred while logging in' })
  }
};

module.exports = {login, signUp};
