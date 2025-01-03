import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    posts: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        images: [
          {
            id: String, // Cloudinary ID
            url: String, // Cloudinary URL
          },
        ],
        tags: [
          {
            type: String,
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Collection = mongoose.model("Collection", collectionSchema);
