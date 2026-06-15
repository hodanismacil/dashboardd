import { Schema, model } from "mongoose";
const emailSchema = new Schema(
  {
    senderName: {
      type: String,
      required: true,
    },
    senderEmail: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },

    isStarred: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    isSpam: {
      type: Boolean,
      default: false,
    },

    isSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Email = model('Email', emailSchema);
export default Email;