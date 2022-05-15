const asyncHandler = require('express-async-handler');

// @desc Get protocols
// @route GET /api/protocols
// @access private
const getProtocols = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Get Protocols'});
});

// @desc Get protocol by id
// @route GET /api/protocols/:id
// @access private
const getProtocolById = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Get protocol of ${req.params.id}`});
});

// @desc Set protocol
// @route POST /api/protocols
// @access private
const setProtocol = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please enter a text field');
    }
    res.status(200).json({ message: 'Set Protocol'});
});

// @desc Update protocol
// @route PUT /api/protocols/:id
// @access private
const updateProtocol = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Update protocol of ${req.params.id}`});
});

// @desc Delete protocol
// @route DELETE /api/protocols/:id
// @access private
const deleteProtocol = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete protocol of ${req.params.id}`});
});

module.exports = {
    getProtocols,
    getProtocolById,
    setProtocol,
    updateProtocol,
    deleteProtocol
}


