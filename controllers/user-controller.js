const { User } = require('../models');

const userController = {
   // get all users
   getAllUsers(req, res) {
      User.find()
         // .populate({
         //    path: 'thoughts',
         //    select: '-__v'
         // })
         .select('-__v')
         .sort({ _id: -1 })
         .then(userData => res.json(userData))
         .catch(err => res.json(err.message));
   },

   // get one user by id
   getUserById({ params }, res) {
      User.findOne({ _id: params.id })
         .populate('thoughts', 'friends')
         .select('-__v')
         .then(userData => {
            if (!userData) {
               return res.status(404).json({message: "No user with that Id"});
            }
            res.json(userData)
         }).catch(err => res.json(err.message));
   },

   // create User
   createUser({ body }, res) {
      User.create(body)
         .then(userData => res.json(userData))
         .catch(err => res.json(err.message));
   },

   // update user by id
   updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
         .then(userData => {
            if (!userData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(userData);
         })
         .catch(err => res.json(err.message));
   },

   // delete user
   deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
         .then(userData => res.json(userData))
         .catch(err => res.json(err.message));
   },

   addFriend(req, res) {
      User.findOneAndUpdate(
         { _id: req.params.userId }, 
         { $addToSet: { friends: req.params.friendId } }, 
         { new: true })
         .then((userData) => {
            if (!userData) {
               return res.status(404).json({ message: "No user with this id" });
            }
            res.json(userData);
         }).catch(err => res.json(err.message));
   },
   
   removeFriend(req, res) {
      User.findOneAndUpdate(
         { _id: req.params.userId }, 
         { $pull: { friends: req.params.friendId } }, 
         { new: true })
         .then((userData) => {
            if (!userData) {
               return res.status(404).json({ message: "No user with this id" });
            }
            res.json(userData);
         }).catch(err => res.json(err.message));
   },
};



module.exports = userController;
