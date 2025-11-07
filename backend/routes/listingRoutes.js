const express = require('express');
const router = express.Router();
const {
  getAllListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  getMyListings
} = require('../controllers/listingController');
const { protect } = require('../middleware/auth');

// All listing routes require authentication
router.use(protect);

// Get my listings (must be before /:id route)
router.get('/my-listings', getMyListings);

// Main listing routes
router.route('/')
  .get(getAllListings)
  .post(createListing);

router.route('/:id')
  .get(getListing)
  .put(updateListing)
  .delete(deleteListing);

module.exports = router;