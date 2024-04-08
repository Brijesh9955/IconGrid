// routes :
const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin');
const interfaceController = require('../controller/interface');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/interface');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
    }
});

// Define file filter function for validation
const fileFilter = function (req, file, cb) {
    // Check file types or other validation conditions
    if (file.mimetype === 'image/svg+xml') {
        // Accept SVG files
        cb(null, true);
    } else {
        // Reject other file types
        cb(new Error('Unsupported file type. Only SVG files are allowed.'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter // Add file filter function here
}).fields([
    { name: 'regular', maxCount: 6 },
    { name: 'bold', maxCount: 6 },
    { name: 'thin', maxCount: 6 },
    { name: 'solid', maxCount: 6 },
    { name: 'straight', maxCount: 6 },
    { name: 'rounded', maxCount: 6 }
]);

router.post('/create', adminController.sequre, upload, interfaceController.interfaceCreate);

router.get('/find', interfaceController.interfaceFind);

router.get('/findOne/:categoryName', interfaceController.interfaceFindOne);

router.get('/findById/:iconId', interfaceController.interfaceFindById);

router.delete('/delete/:deleteId', adminController.sequre, interfaceController.interfaceDelete);

router.put('/update/:updateId', adminController.sequre, upload, interfaceController.interfaceUpdate);

module.exports = router;