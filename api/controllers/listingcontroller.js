const { Listing } = require("../models/listingmodel");
const { errorHandler } = require("../utils/error");

const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return res.status(404).json({ error: "Listing Not Found!" });
  }

  if (req.user.id !== listing.userRef) {
    return res.status(401).json({ error: "You can only update your own listings!" });
  }
  try {
    const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

module.exports = { createListing, deleteListing, updateListing };
