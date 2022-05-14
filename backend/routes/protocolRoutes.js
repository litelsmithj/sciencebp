const express = require('express');
const router = express.Router();
const { getProtocols, setProtocol, updateProtocol, deleteProtocol } = require('../controllers/protocolController');

router.route('/').get(getProtocols).post(setProtocol);

router.route('/:id').put(updateProtocol).delete(deleteProtocol);

module.exports = router;