exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide email and password'
      });
    }

    // 2) Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({
        status: 'fail',
        message: 'Incorrect email or password'
      });
    }

    // 3) Generate JWT token
    const token = signToken(user._id);

    // 4) Remove password from output
    user.password = undefined;

    // 5) Send response
    res.status(200).json({
      status: 'success',
      token,
      data: {
        user
      }
    });

  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};