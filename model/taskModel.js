const mongoose = require('mongoose');


//Comment Schema

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    _id: true 
  }
);


//Task Schema

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },

    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },

    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    dueDate: {
      type: Date
    },

    comments: [commentSchema],

    updateCounter: {
      type: Number,
      default: 0
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true 
  }
);

module.exports = mongoose.model('Task', taskSchema);
