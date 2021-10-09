const { Schema, model } = require('mongoose');
const reactionSchema = require("./Reaction");
const dateFormat = require('../utils/dateFormat');

// const ReactionSchema = new Schema(
//    {
//       ReactionSchema: {
//          type: Schema.Types.ObjectId,
//          default: () => new Types.ObjectId()
//       },
//       reactionBody: {
//          type: String,
//          required: true
//       },
//       writtenBy: {
//          type: String,
//          required: true,
//          trim: true
//       },
//       createdAt: {
//          type: Date,
//          default: Date.now,
//          get: createdAtVal => dateFormat(createdAtVal)
//       }
//    },
//    {
//       toJSON: {
//          getters: true
//       }
//    }
// );

const ThoughtSchema = new Schema(
   {
      username: {
         type: String,
         required: true
      },
      thoughtBody: {
         type: String,
         required: true
      },
      createdAt: {
         type: Date,
         default: Date.now,
         get: createdAtVal => dateFormat(createdAtVal)
      },
      reactions: [reactionSchema]
   },
   {
      toJSON: {
         virtuals: true,
         getters: true
      },
      id: false
   }
);

ThoughtSchema.virtual('reactionCount').get(function () {
   return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
