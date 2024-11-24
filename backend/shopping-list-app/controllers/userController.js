exports.createUser = (req, res, next) => {
    const { name, email } = req.body;
  
    if (!name || !email) {
      return next(new Error('Missing required fields: name or email'));
    }
  
    const newUser = { name, email };
    
   
    res.status(201).json(newUser);
  };
  