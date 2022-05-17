const express = require('express');
const router = express.Router();
const { getProtocols, setProtocol, updateProtocol, deleteProtocol, getProtocolById } = require('../controllers/protocolController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getProtocols).post(protect, setProtocol);

router.route('/:id').get(getProtocolById).put(protect, updateProtocol).delete(protect, deleteProtocol);

module.exports = router;