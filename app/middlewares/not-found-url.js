const notFoundUrl = (req, res) => 
    res.status(404).json({msg: 'Route does not exists'});

module.exports = notFoundUrl;