const bcrypt = require('bcryptjs');

module.exports = {

    register: async (req, res) => {
        // bringing in stuff
        const db = req.app.get('db');
        // console.log('handler hit');

        const { username, password } = req.body;

        // username stuff
        const user = await db.auth.get_user(username);
        if (user[0]) {
            return res.status(400).send('email already registered')
        }

        // password stuff
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await db.auth.add_user(username, hash);

        // session stuff
        req.session.user = newUser[0];

        // response
        res.status(200).send(req.session.user);

    },

    getSession: (req, res) => {
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(204)
        }
    }
}