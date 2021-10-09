const { Thought, User } = require('../models');

const thoughtController = {
   // get all thoguhts
   getThoughts(req, res) {
      Thought.find()
         .sort({ createdAt: -1 })
         .then((thoughtData) => {
            res.json(thoughtData);
         }).catch(err => res.json(err.message));
   },
   // get one thought
   getSingleThought(req, res) {
      Thought.findOne({ _id: req.params.thoughtId })
         .then((thoughtData) => {
            if (!thoughtData) {
               return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thoughtData);
         }).catch(err => res.json(err.message));
   },
   // post a thgouht
   addThought(req, res) {
      console.log(req.body);
      Thought.create(req.body)
         .then((thoughtData) => {
            return User.findOneAndUpdate(
               { _id: params.userId },
               { $push: { thoughts: thoughtData._id } },
               { new: true }
            );
         }).then(userData => {
            console.log(userData);
            if (!userData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(userData);
         }).catch(err => res.json(err.message));
   },

   updateThought(req, res) {
      Thought.findOneAndUpdate(
         { _id: req.params.thoughtId },
         { $set: req.body },
         { runValidators: true, new: true })
         .then((thoughtData) => {
            if (!thoughtData) {
               return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(thoughtData);
         }).catch(err => res.json(err.message));
   },

   // add reaction to comment
   addReaction(req, res) {
      Thought.findOneAndUpdate(
         { _id: req.params.thoughtId },
         { $push: { reactions: req.body } },
         { new: true, runValidators: true }
      ).then((thoughtData) => {
         if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
         }
         res.json(thoughtData);
      }).catch(err => res.json(err.message));
   },

   // remove thought
   removeThought(req, res) {
      Thought.findOneAndRemove({ _id: req.params.thoughtId })
         .then(thoughtData => {
            if (!thoughtData) {
               return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
               { thoughts: req.params.thoughtId },
               { $pull: { thoughts: req.params.thoughtId } },
               { new: true }
            );
         }).then(userData => {
            if (!userData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json({ message: "Thought deleted" });
         }).catch(err => res.json(err.message));
   },
   // remove reaction
   removeReaction(req, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $pull: { reactions: { reactionId: req.params.reactionId } } },
         { new: true }
      ).then((thoughtData) => {
         if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with this id!' });
         }
         res.json(thoughtData);
      }).catch(err => res.json(err.message));
   }
};

module.exports = thoughtController;
