const router = require('express').Router();
const {
  addThought,
  removeThought,
  addReply,
  removeReply
} = require('../../controllers/thought-controller');

// /api/comments/<pizzaId>
router.route('/:userId').post(addThought);

// /api/comments/<pizzaId>/<commentId>
router
  .route('/:userId/:thoughtId')
  .put(addReply)
  .delete(removeThought);

// /api/comments/<pizzaId>/<commentId>/<replyId>
router.route('/:userId/:thoughtId/:replyId').delete(removeReply);

module.exports = router;
