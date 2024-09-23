/**
 * Generates a report of parts with their creation and modification timestamps.
 * This report is accessed via the GET /api/reports/parts-timestamps route.
 * Access is restricted to authenticated users.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object containing the report title, date, and part timestamps.
 */
const getPartsTimestampReport = asyncHandler(async (req, res) => {
  const parts = await Part.find().select("name createdAt updatedAt");

  res.status(200).json({
    title: "Parts Creation/Modification Report",
    date: new Date(),
    parts,
  });
});

/**
 * Generates a report of products with their creation and modification timestamps.
 * This report is accessed via the GET /api/reports/products-timestamps route.
 * Access is restricted to authenticated users.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object containing the report title, date, and product timestamps.
 */
const getProductsTimestampReport = asyncHandler(async (req, res) => {
  const products = await Product.find().select("name createdAt updatedAt");

  res.status(200).json({
    title: "Products Creation/Modification Report",
    date: new Date(),
    products,
  });
});

/**
 * Generates a report of users with their creation and modification timestamps.
 * This report is accessed via the GET /api/reports/users-timestamps route.
 * Access is restricted to authenticated users.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - Returns a JSON object containing the report title, date, and user timestamps.
 */
const getUsersTimestampReport = asyncHandler(async (req, res) => {
  const users = await User.find().select(
    "firstName lastName email createdAt updatedAt"
  );

  res.status(200).json({
    title: "Users Creation/Modification Report",
    date: new Date(),
    users,
  });
});

module.exports = {
  getPartsTimestampReport,
  getProductsTimestampReport,
  getUsersTimestampReport,
};
