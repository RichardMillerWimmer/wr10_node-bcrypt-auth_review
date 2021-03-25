module.exports = {

    checkUsername: (req, res, next) => {
        if (req.body.username.includes('@') && req.body.username.includes('.')) {
            console.log('valid username received');
            next();
        } else {
            res.status(403).send('invalid email')
        }
    }
}