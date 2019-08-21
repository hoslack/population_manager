const {signUp, login} = require('../controllers/authController');
const {createLocation, getAllLocations, getOneLocation, updateLocation, deleteLocation} = require('../controllers/locationController');
const isAuthenticated = require('../middleWares/isAuthenticated');
const router = require('express').Router();

router.post('/location', isAuthenticated, createLocation);
router.get('/location', isAuthenticated, getAllLocations);
router.get('/location/:id', isAuthenticated, getOneLocation);
router.put('/location/:id', isAuthenticated, updateLocation);
router.delete('/location/:id', isAuthenticated, deleteLocation);

router.post('/sign_up', signUp);
router.post('/login', login);

module.exports = router;
