import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  Events: [
    {
      title: {
        type: String,
        required: true,
      },
      eventId: {
        type: Number,
        required: true,
      },
      details: {
        description: {
          type: String,
          required: true,
        },
        venue: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
      registeredStudents: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      termsandconditions: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    },
  ],
});

export default mongoose.model("Event", eventSchema);
