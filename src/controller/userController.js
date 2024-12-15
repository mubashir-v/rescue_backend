const User = require('../model/userModel'); // Adjust the path to your User model file

// Controller for user registration
const registerUser = async (req, res) => {
  try {
    const { username, password, userType, name, phone, address } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = password;

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      userType,
      name,
      phone,
      address,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred during registration' });
  }
};

// Controller for user login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = password==user.password;

   
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    res.status(200).json({ success: true, message: 'Login successful',data:user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
