import User from "../models/UserModels.js";

// createUser-----------------------------------------------------------------
export const createUser = (req, res) => {
  new User(req.body)
    .save()
    .then((user) =>
      res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: `Failed to create user: ${err.message}`,
        error: err,
      })
    );
};

// export const createUser = (req, res) => {
//   const { username, email, password } = req.body;   //change the variable names

//   // Hash the password before saving it
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) {
//       return res.status(500).json({
//         success: false,
//         message: `Failed to hash password: ${err.message}`,
//         error: err,
//       });
//     }

//     const newUser = new User({
//       username: username,
//       email: email,
//       password: hashedPassword, // Store the hashed password
//     });

//     newUser
//       .save()
//       .then((user) =>
//         res.status(201).json({
//           success: true,
//           message: "User created successfully",
//           data: user,
//         })
//       )
//       .catch((err) =>
//         res.status(400).json({
//           success: false,
//           message: `Failed to create user: ${err.message}`,
//           error: err,
//         })
//       );
//   });
// };
// getAllUser--------------------------------------------------------------

export const getAllUsers = (req, res) => {
  User.find()
    .then((users) =>
      res.status(200).json({
        success: true,
        message: "get request process successfully",
        data: users,
      })
    )
    .catch((err) => res.status(400).json({ success: false, message: err }));
};

// updateUser-----------------------------------------------------------------

export const updateUser = (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  User.findByIdAndUpdate(id, {
    //   profileImage : newData.userImage,  //change the variable name
    username: newData.username,
    email: newData.email,
    password: newData.password,
    phoneNum: newData.phoneNum,
  })
    .then((updatedData) =>
      res.status(200).json({ success: true, data: updatedData })
    )
    .catch((err) =>
      res.status(400).json({
        success: false,
        message: `Failed to create user: ${err.message}`,
        error: err,
      })
    );
};


export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    await User.deleteOne({ _id: id });

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
