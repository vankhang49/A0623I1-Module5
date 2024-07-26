module.exports = (req, res) => {
    return res.status(201).send({
        id: req.body.id,
        name: req.body.name,
        birthday: req.body.birthday
    });
};