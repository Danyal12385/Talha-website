const express = require('express');
const router = express();
const path = require('path');
const authenticateAdmin = require('../../middlewares/authenticateAdmin');
const authenticateRegionalAdmin = require('../../middlewares/authenticateRegionalAdmin');

// Admin Authntication Routes
router.get('/admin', (req, res) => {
    res.sendFile(pageHandler('auth/login.html'));
})
// ---------------------- //

// Admin Authnticated Routes
router.get('/admin/dashboard', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/index.html'));
})

router.get('/admin/home-content', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/home_content.html'));
})

router.get('/admin/add/home-content', authenticateAdmin, authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/home_content_add.html'));
})

router.get('/admin/edit/home-content', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/home_content_edit.html'));
})

router.get('/admin/edit/home-counting', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/home_counting_edit.html'));
})

router.get('/admin/user', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/user.html'));
})

router.get('/admin/add/user', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/user_add.html'));
})

router.get('/admin/edit/user', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/user_edit.html'));
})

router.get('/admin/region', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/region.html'));
})

router.get('/admin/add/region', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/region_add.html'));
})

router.get('/admin/edit/region', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/region_edit.html'));
})

router.get('/admin/donation', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/donation.html'));
})

router.get('/admin/report', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/report.html'));
})

router.get('/admin/event', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/event.html'));
})

router.get('/admin/edit/event', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/edit_event.html'));
})

router.get('/admin/family', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/family.html'));
})

router.get('/admin/sponsor', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/sponsor.html'));
})

router.get('/admin/induction-request', authenticateAdmin, (req, res) => {
    res.sendFile(pageHandler('admin/induction_request.html'));
})
// --------- //

// Regional Admin Authenticated Routes
router.get('/ra/dashboard', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/index.html'));
})

router.get('/ra/induction', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/induction.html'));
})

router.get('/ra/event', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/event.html'));
})

router.get('/ra/add/event', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/add_event.html'));
})

router.get('/ra/edit/event', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/edit_event.html'));
})

router.get('/ra/report', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/report.html'));
})

router.get('/ra/induction-request', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/induction_request.html'));
})

router.get('/ra/sponsor', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/sponsor.html'));
})

router.get('/ra/family', authenticateRegionalAdmin, (req, res) => {
    res.sendFile(pageHandler('regional_admin/family.html'));
})
// -------------------------------- //

// User Authentication Routes
router.get('/signup', (req, res) => {
    res.sendFile(pageHandler('signup.html'));
})

router.get('/login', (req, res) => {
    res.sendFile(pageHandler('login.html'));
})
// ------------------ //

// Other Routes
router.get('/', (req, res) => {
    res.sendFile(pageHandler('index.html'));
})

router.get('/about', (req, res) => {
    res.sendFile(pageHandler('about.html'));
})

router.get('/family-registration', (req, res) => {
    res.sendFile(pageHandler('registor-form.html'));
})

router.get('/news', (req, res) => {
    res.sendFile(pageHandler('registor-form.html'));
})

router.get('/region', (req, res) => {
    res.sendFile(pageHandler('region.html'));
})

router.get('/donate', (req, res) => {
    res.sendFile(pageHandler('Donate.html'));
})

router.get('/events', (req, res) => {
    res.sendFile(pageHandler('Events.html'));
})

router.get('/regions', (req, res) => {
    res.sendFile(pageHandler('Regions.html'));
})

router.get('/induction', (req, res) => {
    res.sendFile(pageHandler('tran-induction.html'));
})

router.get('/induction/enroll', (req, res) => {
    res.sendFile(pageHandler('induction-form.html'));
})

router.get('/sponsor', (req, res) => {
    res.sendFile(pageHandler('sponsor.html'));
})
// ---------- //

// Checkout Routes
router.get('/checkout/success', (req, res) => {
    res.sendFile(pageHandler('checkout/success.html'));
})

router.get('/checkout/cancel', (req, res) => {
    res.sendFile(pageHandler('checkout/cancel.html'));
})
// ----------- //

// Page Handler
const pageHandler = (page) => {
    return path.join(__dirname, '..', '..', 'public/views', page)
}
// --------- //
module.exports = router;