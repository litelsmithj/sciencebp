const express = require('express');
const router = express.Router();
const { getProtocols, setProtocol, updateProtocol, deleteProtocol, getProtocolById, getArticlesByProtocol } = require('../controllers/protocolController');
const {protect} = require('../middleware/authMiddleware');

router.route('/').get(getProtocols).post(protect, setProtocol);

router.route('/:id').get(getProtocolById).put(protect, updateProtocol).delete(protect, deleteProtocol);

router.route('/:id/articles').get(getArticlesByProtocol);

module.exports = router;