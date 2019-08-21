const Location = require('../models/Location');

const createLocation = async (req, res, next) => {
  const { locationName, male, female } = req.body;
  const { parent } = req.body || '';
  if (!locationName || !male || !female){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
  Location.findOne({ locationName },  (error, location) => {
    if (location){
      res.status(409).json({
        message: 'Location already exists'
      })
    }
  });
    let location;
  location = await Location.find({locationName}).exec();
    if(!location.length) {
      location = new Location({
        locationName,
        male,
        female,
        parent,
        total: Number(male+female)
      });
      await location.save(function(err){
        if(err){
          res.status(500).json({
            message: 'An error occurred while creating the location'
          })
        } else {
          res.status(201).json({
            message: 'Location was created successfully', location
          })
        }
      })
    }
};

const getAllLocations = async (req, res, next) => {
  const locations = await Location.find();
  if (locations.length) {
    res.status(200).json({locations})
  } else {
    res.status(404).json({ message: "No locations found" })
  }
};

const getOneLocation = async (req, res, next) => {
  const { id } = req.params;
  if (!id){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
  const location = await Location.find({ _id: id });
  const children = await Location.find({ parent: id });
  if (location.length) {
    res.status(200).json({ location, children })
  } else {
    res.status(404).json({ message: "No location found" })
  }
};

const updateLocation = async (req, res, next) => {
  const { id } = req.params;
  const { locationName, male, female } = req.body;
  if (!locationName || !male || !female){
    res.status(400).json({ message: 'Please check your request parameters' });
    return
  }
  Location.findOneAndUpdate({_id: id}, {$set: {locationName, male, female}}, {useFindAndModify: false, new: true}, (err, location) => {
    if (err) {
      res.status(400).json({ message: "An error occurred while updating the location" });
    }
    else {
      res.status(200).json({ message: "Location was successfully updated", location });
    }
  });
};

const deleteLocation = async (req, res, next) => {
  const { id } = req.params;
  Location.findOneAndDelete({ _id: id }, (err) => {
    if(err) {
      res.status(400).json({ message: "An error occurred while deleting the location" })
    }
    res.status(204).json({ message: "Location Successfully Deleted" })
  })

};

module.exports = {createLocation, getAllLocations, getOneLocation, updateLocation, deleteLocation};
