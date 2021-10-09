const router = require('express').Router();
const {
   getThoughts,
   getSingleThought,
   updateThought,
   addThought,
   removeThought,
   addReaction,
   removeReaction,
} = require('../../controllers/thought-controller');

// /api/thoughts
router
   .route('/')
   .get(getThoughts)
   .post(createThought);

// /api/thoughts/:thoughtId
router
   .route('/:thoughtId')
   .get(getSingleThought)
   .put(updateThought)
   .delete(removeThought);

// /api/thoughts/:thoughtId/reactions
router
   .route('/:thoughtId/reactions')
   .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router
   .route('/:thoughtId/reactions/:reactionId')
   .delete(removeReaction);

// /api/comments/<pizzaId>
router
   .route('/:userId')
   .post(addThought);

// /api/comments/<pizzaId>/<commentId>
// router
//    .route('/:userId/:thoughtId')
//    .put()
//    .delete(removeThought);

// /api/comments/<pizzaId>/<commentId>/<replyId>
// router.route('/:userId/:thoughtId/:replyId').delete(removeReply);

module.exports = router;
