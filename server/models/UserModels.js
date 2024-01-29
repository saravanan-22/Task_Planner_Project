import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: [3, "Username should have at least 3 characters"],
    },

    age: {
      type: Number,
      default: 0,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, "Password should have at least 6 characters"],
    },

    phoneNum: {
      type: String,
    },

    // Array to store multiple tasks
    tasks: [
      
      {
        taskName: {
          type: String,
          required: true,
          trim: true,
        },
        taskDescription: {
          type: String,
          required: true,
          trim: true,
        },
        taskGroup: {
          type: String,
          required: true,
          trim: true,
        },
          taskImage: {
            type: String,
          },
      },
    ],

    // Array to store completed tasks
    completedTasks: [
      {
        taskName: {
          type: String,
          required: true,
          trim: true,
        },
        taskDescription: {
          type: String,
          required: true,
          trim: true,
        },
        taskGroup: {
          type: String,
          required: true,
          trim: true,
        },
          taskImage: {
            type: String,
          },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
