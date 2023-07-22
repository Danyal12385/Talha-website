const express = require('express');
const router = express();
const upload = require('../../middlewares/fileUpload.js');
const familyFormHandler = require('../../controllers/familyController.js').familyFormHandler;
const createSection = require('../../controllers/homeContentController.js').createSection;
const fetchHomeData = require('../../controllers/homeContentController.js').fetchHomeData;
const getSection = require('../../controllers/homeContentController.js').getSection;
const updateSection = require('../../controllers/homeContentController.js').updateSection;
const deleteHomeSection = require('../../controllers/homeContentController.js').deleteHomeSection;
const getHomeCounting = require('../../controllers/homeContentController.js').getHomeCounting;
const updateHomeCounting = require('../../controllers/homeContentController.js').updateHomeCounting;
const register = require('../../controllers/auth/registerController.js').register;
const login = require('../../controllers/auth/loginController.js').login;
const logout = require('../../controllers/auth/logoutController.js').logout;
const getRegionalAdmins = require('../../controllers/userController.js').getRegionalAdmins;
const getUserById = require('../../controllers/userController.js').getUserById;
const updateUser = require('../../controllers/userController.js').updateUser;
const deleteUser = require('../../controllers/userController.js').deleteUser;
const fetchRegions = require('../../controllers/regionController.js').fetchRegions;
const getRegion = require('../../controllers/regionController.js').getRegion;
const fetchHomeRegion = require('../../controllers/regionController.js').fetchHomeRegion;
const addRegion = require('../../controllers/regionController.js').addRegion;
const updateRegion = require('../../controllers/regionController.js').updateRegion;
const deleteRegion = require('../../controllers/regionController.js').deleteRegion;
const adminSeeder = require('../../controllers/adminSeeder.js').adminSeeder;
const authenticateAdmin = require('../../middlewares/authenticateAdmin.js');
const authenticateRegionalAdmin = require('../../middlewares/authenticateRegionalAdmin.js');
const checkoutSession = require('../../controllers/paymentController.js').checkoutSession;
const markPaid = require('../../controllers/paymentController.js').markPaid;
const markUnpaid = require('../../controllers/paymentController.js').markUnpaid;
const fetchDonation = require('../../controllers/donationController.js').fetchDonation;
const deleteDonation = require('../../controllers/donationController.js').deleteDonation;
const updateStatus = require('../../controllers/inductionController.js').updateStatus;
const event = require('../../controllers/eventController.js').event;
const regionEvent = require('../../controllers/eventController.js').regionEvent;
const getEvent = require('../../controllers/eventController.js').getEvent;
const createEvent = require('../../controllers/eventController.js').createEvent;
const updateEvent = require('../../controllers/eventController.js').updateEvent;
const deleteEvent = require('../../controllers/eventController.js').deleteEvent;
const homeEvents = require('../../controllers/eventController.js').homeEvents;
const regionReport = require('../../controllers/reportController.js').regionReport;
const addReport = require('../../controllers/reportController.js').addReport;
const deleteReport = require('../../controllers/reportController.js').deleteReport;
const addInduction = require('../../controllers/inductionFormController.js').addInduction;
const addSponser = require('../../controllers/sponsorController.js').addSponser;
const fetchInduction = require('../../controllers/inductionController.js').fetchInduction;
const getInduction = require('../../controllers/inductionController.js').getInduction;
const deleteInduction = require('../../controllers/inductionController.js').deleteInduction;
const fetchSponsor = require('../../controllers/sponsorController.js').fetchSponsor;
const getSponsor = require('../../controllers/sponsorController.js').getSponsor;
const deleteSponsor = require('../../controllers/sponsorController.js').deleteSponsor;
const getFamily = require('../../controllers/familyController.js').getFamily;
const fetchFamily = require('../../controllers/familyController.js').fetchFamily;
const adminReport = require('../../controllers/reportController.js').adminReport;
const adminDashboardStats = require('../../controllers/dashboardController.js').adminDashboardStats;
const raDashboardStats = require('../../controllers/dashboardController.js').raDashboardStats;

// Authentication Routes
router.post('/api/register', upload.array(), register);
router.post('/api/login', upload.array(), login);
router.get('/api/logout', upload.array(), logout);
// ------------------ //

// Admin Authenticated Routes
router.post('/api/admin/home-content/add', [upload.single('media'), authenticateAdmin], createSection);
router.post('/api/admin/home-content/edit', [upload.single('media'), authenticateAdmin], getSection);
router.post('/api/admin/home-content/update', [upload.single('media'), authenticateAdmin], updateSection);
router.post('/api/admin/home-content/delete', authenticateAdmin, deleteHomeSection);
router.get('/api/admin/home-couting', authenticateAdmin, getHomeCounting);
router.post('/api/admin/home-couting', [upload.array(), authenticateAdmin], updateHomeCounting);
router.post('/api/regional-admin', authenticateAdmin, getRegionalAdmins);
router.post('/api/regional-admin/get', [upload.array(), authenticateAdmin], getUserById);
router.post('/api/update-user', upload.array(), updateUser);
router.post('/api/delete-user', upload.array(), deleteUser);
router.get('/api/region', fetchRegions);
router.post('/api/get/region', upload.array(), getRegion);
router.post('/api/add/region', [authenticateAdmin, upload.any()], addRegion);
router.post('/api/updateRegion/region', [authenticateAdmin, upload.any()], updateRegion);
router.post('/api/delete/region', upload.array(), deleteRegion);
router.get('/api/fetch-donation', authenticateAdmin, fetchDonation);
router.post('/api/delete-donation', authenticateAdmin, deleteDonation);
router.get('/api/event', authenticateAdmin, event);
router.get('/api/admin/region-report', authenticateAdmin,  adminReport);
router.post('/api/admin/delete/report',  [authenticateAdmin, upload.single('image')], deleteReport);
router.post('/api/admin/update/event',  [authenticateAdmin, upload.single('image')], updateEvent);
router.post('/api/admin/get-family',  [authenticateAdmin, upload.array()], fetchFamily);
router.get('/api/admin/dashboard-stats', authenticateAdmin, adminDashboardStats);
router.get('/api/fetch-sponsor', authenticateAdmin, fetchSponsor);
router.post('/api/admin/sponsor/delete',  [authenticateAdmin, upload.array()], deleteSponsor);
router.get('/api/admin/induction',  authenticateAdmin, fetchInduction);
router.post('/api/admin/induction/delete',  [authenticateAdmin, upload.array()], deleteInduction);
// ----------------------- //

// Regional Admin Authenticated Routes
router.post('/api/ra/region', [authenticateRegionalAdmin, upload.array()], getRegion);
router.post('/api/ra/update/induction-status', [authenticateRegionalAdmin, upload.array()], updateStatus);
router.post('/api/ra/region-event',  authenticateRegionalAdmin, regionEvent);
router.post('/api/ra/get-event', getEvent);
router.post('/api/ra/add/event',  [authenticateRegionalAdmin, upload.single('image')], createEvent);
router.post('/api/ra/update/event',  [authenticateRegionalAdmin, upload.single('image')], updateEvent);
router.post('/api/ra/delete/event', upload.array(), deleteEvent);
router.post('/api/ra/region-report', [authenticateRegionalAdmin, upload.array()], regionReport);
router.post('/api/ra/add/report',  [authenticateRegionalAdmin, upload.single('image')], addReport);
router.post('/api/ra/delete/report',  [authenticateRegionalAdmin, upload.single('image')], deleteReport);
router.post('/api/ra/induction',  [authenticateRegionalAdmin, upload.array()], getInduction);
router.post('/api/ra/induction/delete',  [authenticateRegionalAdmin, upload.array()], deleteInduction);
router.post('/api/ra/sponsor',  [authenticateRegionalAdmin, upload.array()], getSponsor);
router.post('/api/ra/sponsor/delete',  [authenticateRegionalAdmin, upload.array()], deleteSponsor);
router.post('/api/ra/get-family',  [authenticateRegionalAdmin, upload.array()], getFamily);
router.post('/api/ra/dashboard-stats',  [authenticateRegionalAdmin, upload.array()], raDashboardStats);
// -------------------------------- //

// Payment Routes
router.post('/api/checkout-session', upload.array(), checkoutSession);
router.post('/api/checkout/mark-paid', upload.array(), markPaid);
router.post('/api/checkout/mark-unpaid', upload.array(), markUnpaid);
// ---------- //

// Admin Seeder
router.get('/admin/seed', adminSeeder);
// --------- //

// Other Routes
router.get('/api/fetch-region', fetchHomeRegion)
router.get('/api/home/content', fetchHomeData);
router.post('/api/family-registration', upload.any(), familyFormHandler);
router.get('/api/home-event', homeEvents);
router.post('/api/add-induction', upload.array(), addInduction);
router.post('/api/add-sponsor', upload.array(), addSponser);
// -------- //

module.exports = router;