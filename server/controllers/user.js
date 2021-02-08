const bcrypt = require('bcryptjs');

module.exports = {
    register_user: async (req, res) => {
        const { username, password } = req.body;
        const db = req.app.get('db');
        console.log("ZOL Username: " + username)
        const result = await db.user.find_user_by_username([username]);
        console.log("ZOL Result: " + result[0])
        const existingUser = result[0];
        if (existingUser) {
            return res.status(409).send('Username taken');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        console.log("ZOL Hash: " + hash)
        const registeredUser = await db.user.create_user([username, hash]);
        const user = registeredUser[0];
        console.log("ZOL user: " + user)
        req.session.user = { id: user.id, username: user.username, badId: user.bag_id };
        return res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const { username, password } = req.body
        const foundUser = await req.app.get('db').user.find_user_by_username([username])
        const user = foundUser[0];
        if (!user) {
            return res.status(401).send('User  not found. Please register as a new user before logging in.');
        }
        const isAuthenticated = bcrypt.compareSync(password, user.hash);
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password');
        }
        req.session.user = { id: user.id, username: user.username, bagId: user.bag_id };
        return res.send(req.session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    },
    getUser: (req, res) => {
        if (req.session.user !== null) {
            return res.send(req.session.user);
        } else {
            res.status(404).send('No user logged in current session')
        }
    }

}