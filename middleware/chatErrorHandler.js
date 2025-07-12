const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);
    res.status(500).json({ error: 'Something went wrong' });
  };
  
  module.exports = errorHandler;
  