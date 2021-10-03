const { Thoughts, User } = require('../models');

const thoughtController = {
   // add comment to pizza
   addThought({ params, body }, res) {
      console.log(params);
      Thought.create(body)
         .then(({ _id }) => {
            return User.findOneAndUpdate(
               { _id: params.userId },
               { $push: { thoughts: _id } },
               { new: true }
            );
         })
         .then(dbUserData => {
            console.log(dbUserData);
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.json(err));
   },

   // add reaction to comment
   addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
         { _id: params.commentId },
         { $push: { reactions: body } },
         { new: true, runValidators: true }
      )
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.json(err));
   },

   // remove comment
   removeThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.thoughtId })
         .then(deletedThought => {
            if (!deletedThought) {
               return res.status(404).json({ message: 'No thought with this id!' });
            }
            return User.findOneAndUpdate(
               { _id: params.userId },
               { $pull: { thought: params.thoughtId } },
               { new: true }
            );
         })
         .then(dbUserData => {
            if (!dbUserData) {
               res.status(404).json({ message: 'No user found with this id!' });
               return;
            }
            res.json(dbUserData);
         })
         .catch(err => res.json(err));
   },
   // remove reaction
   removeReaction({ params }, res) {
      Thought.findOneAndUpdate(
         { _id: params.thoughtId },
         { $pull: { reactions: { reactionId: params.reactionId } } },
         { new: true }
      )
         .then(dbUserData => res.json(dbUserData))
         .catch(err => res.json(err));
   }
};

module.exports = thoughtController;
