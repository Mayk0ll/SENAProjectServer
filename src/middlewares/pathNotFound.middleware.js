const pathNotFound = (req, res) => {
    const message = "Path not found";
    const data = {
        method: req.method,
        url: req.url,
        error: message
    }
    return res.status(404).json(data);
}

export default pathNotFound;