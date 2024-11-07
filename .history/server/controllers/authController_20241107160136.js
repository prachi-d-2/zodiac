const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Request Body:', req.body);  // Log the incoming request body to check

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send('User already exists');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });

    // Save the new user to the database
    await newUser.save();

    // Generate JWT token for the user
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the response with the token and user data
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    console.error('Error in registerUser:', error);  // Log the error for debugging
    res.status(500).send('Server error');
  }
};
