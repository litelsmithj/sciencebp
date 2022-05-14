const express = require('express');
const router = express.Router();
const { getProtocols, setProtocol, updateProtocol, deleteProtocol, getProtocolById } = require('../controllers/protocolController');

router.route('/').get(getProtocols).post(setProtocol);

router.route('/:id').get(getProtocolById).put(updateProtocol).delete(deleteProtocol);

module.exports = router;