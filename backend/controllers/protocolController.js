// @desc Get protocols
// @route GET /api/protocols
// @access private
const getProtocols = (req, res) => {
    res.status(200).json({ messsage: 'Get Protocols'});
}

// @desc Set protocol
// @route POST /api/protocols
// @access private
const setProtocol = (req, res) => {
    res.status(200).json({ messsage: 'Set Protocol'});
}

// @desc Update protocol
// @route PUT /api/protocols
// @access private
const updateProtocol = (req, res) => {
    res.status(200).json({ messsage: `Update protocol of ${req.params.id}`});
}

// @desc Delete protocol
// @route DELETE /api/protocols
// @access private
const deleteProtocol = (req, res) => {
    res.status(200).json({ messsage: `Delete protocol of ${req.params.id}`});
}

module.exports = {
    getProtocols,
    setProtocol,
    updateProtocol,
    deleteProtocol
}


