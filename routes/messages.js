const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Message = require('../models/message');
const User = require('../models/User');

// @route     GET api/message
// @desc      Get all messages
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/message
// @desc      Add new messages
// @access    Private
router.post(
  '/',
  [
    auth
  ],
  async (req, res) => {
    
    const { msj, _email, level } = req.body;

    let userSend = await User.findOne({"email":_email});

    //buscar tus datos
    let user = await User.findById(req.user.id);
    
    const {name, email, phone, type} = user;

    try {
      const newMessage = new Message({
        name,
        email,
        phone,
        type,
        msj,
        level,
        user: userSend._id
      });

      await newMessage.save();

      res.status(200).send('Saved');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
  }
);

// @route     DELETE api/message/:id
// @desc      Delete message
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let message = await Message.findById(req.params.id);

    if (!message) return res.status(404).json({ msg: 'Message not found' });

    // Make sure user owns message
    if (message.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Message.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Message removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
