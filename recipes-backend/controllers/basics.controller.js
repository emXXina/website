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
        res.status(404).send({});
        console.log(msg404 + " :\n" + err.message);
    } else {
        res.status(500).send({});
        console.log(msg500 + " :\n" + err.message);
    }
};

exports.checkReqBody = (req, res) => {
    if (!req.body) {
        res.status(400).send();
        console.log("Request body can not be empty!");
    }
}