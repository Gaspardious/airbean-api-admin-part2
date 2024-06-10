//Middleware för att kontrollera att en användare är inloggad.
//används för att visa orderhistoriken 

export const authenticate = (req, res, next) => {
  if (global.currentUser) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'You need to be logged in to view the order history',
      status: 401
    });
  }
};

export const adminAuthenticate = (req, res, next) => {
  if (global.currentAdminUser) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: 'You need to be logged in to view the admin page',
      status: 401
    });
  }
};


