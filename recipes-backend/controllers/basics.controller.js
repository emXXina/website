exports.resultHandling = (req, res, msg404, msg500) => {
    return (err, data) => {
        if (err) {
            this.errorHandling(req, res, err, msg404, msg500);
        } else {
            res.send(data);
        }
    };
};

exports.errorHandling = (req, res, err, msg404, msg500) => {
    if (err.kind === "not_found") {
        res.status(404).send({
            message:  err.message || msg404
        });
    } else {
        res.status(500).send({
            message:  err.message || msg500
        });
    }
};

exports.checkReqBody = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
}