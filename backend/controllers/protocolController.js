const asyncHandler = require('express-async-handler');
const Protocol = require('../models/protocolModel');
const User = require('../models/userModel');

// @desc Get protocols
// @route GET /api/protocols
// @access public
// Ok to return user?
const getProtocols = asyncHandler(async (req, res) => {
    const protocols = await Protocol.find();
    res.status(200).json(protocols);
});

// @desc Get protocol by id
// @route GET /api/protocols/:id
// @access public
// Is this needed?
const getProtocolById = asyncHandler(async (req, res) => {
    const protocol = await Protocol.findById(req.params.id);

    if (!protocol) {
        res.status(400);
        throw new Error("Protocol not found");
    }

    res.status(200).json(protocol.select('-user'));
});

// @desc Set protocol
// @route POST /api/protocols
// @access private
const setProtocol = asyncHandler(async (req, res) => {
    if (!req.body.name) {
        res.status(400);
        throw new Error('Please enter a name field');
    }

    const protocol = await Protocol.create({
        name: req.body.name,
        user: req.user.id
    });

    res.status(200).json(protocol);
});

// @desc Update protocol
// @route PUT /api/protocols/:id
// @access private
const updateProtocol = asyncHandler(async (req, res) => {
    const protocol = await Protocol.findById(req.params.id);

    if (!protocol) {
        res.status(400);
        throw new Error ('Protocol not found');
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (protocol.user.toString() !== user.id){
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedProtocol = await Protocol.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });

    res.status(200).json(updatedProtocol);
});

// @desc Delete protocol
// @route DELETE /api/protocols/:id
// @access private
const deleteProtocol = asyncHandler(async (req, res) => {
    const protocol = await Protocol.findById(req.params.id);

    if (!protocol) {
        res.status(400);
        throw new Error ('Protocol not found');
    };

    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error("User not found");
    }

    if (protocol.user.toString() !== user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await protocol.deleteOne();

    res.status(200).json({ id: req.params.id});
});

module.exports = {
    getProtocols,
    getProtocolById,
    setProtocol,
    updateProtocol,
    deleteProtocol
}


