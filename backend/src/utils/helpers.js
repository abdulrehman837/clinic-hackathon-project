export const paginate = (page = 1, limit = 10) => {
  const skip = (page - 1) * limit
  return { skip, limit: parseInt(limit) }
}

export const sendResponse = (res, statusCode, data, message = 'Success') => {
  res.status(statusCode).json({ success: true, message, data })
}