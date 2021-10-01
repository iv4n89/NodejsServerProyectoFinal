module.exports = app => {

    const Tasks = app.db.models.Tasks;
    app.get('/tasks', (req, res) => {
        Tasks.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            })
    })
}