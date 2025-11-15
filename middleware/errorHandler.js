// middleware/errorHandler.js
// Global error handler

const errorHandler = (err, req, res, next) => {
  console.error(err); // server-side logging
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server Error" });
};

export default errorHandler;
