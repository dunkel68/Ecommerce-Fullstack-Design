// server/routes/userRoutes.js
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // 2. Create new user
    const newUser = await User.create({ name, email, password });
    
    // 3. Respond with success (no sensitive data)
    res.status(201).json({ 
      message: 'Signup successful! Please login.',
      user: { id: newUser._id, name: newUser.name }
    });

  } catch (error) {
    res.status(500).json({ error: 'Signup failed' });
  }
});