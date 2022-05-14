// @desc Get protocols
// @route GET /api/protocols
// @access private
const getProtocols = (req, res) => {
    res.status(200).json({ messsage: 'Get Protocols'});
}

// @desc Get protocol by id
// @route GET /api/protocols/:id
// @access private
const getProtocolById = (req, res) => {
    res.status(200).json({ messsage: `Get protocol of ${req.params.id}`});
}

// @desc Set protocol
// @route POST /api/protocols
// @access private
const setProtocol = (req, res) => {
    res.status(200).json({ messsage: 'Set Protocol'});
}

// @desc Update protocol
// @route PUT /api/protocols/:id
// @access private
const updateProtocol = (req, res) => {
    res.status(200).json({ messsage: `Update protocol of ${req.params.id}`});
}

// @desc Delete protocol
// @route DELETE /api/protocols/:id
// @access private
const deleteProtocol = (req, res) => {
    res.status(200).json({ messsage: `Delete protocol of ${req.params.id}`});
}

module.exports = {
    getProtocols,
    getProtocolById,
    setProtocol,
    updateProtocol,
    deleteProtocol
}


