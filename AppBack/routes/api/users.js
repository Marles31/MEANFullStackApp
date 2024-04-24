const router = require('express').Router();
const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// POST api/users/register

router.post('/register', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);

        const user = await User.create(req.body);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// POST api/users/login

router.post('/login', async (req, res) => {
    //comprobar si el mail existe
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    //comprobar si la contraseña es correcta
    const eq = bcrypt.compareSync(req.body.password, user.password);

    if (!eq) {
        return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    res.json({ success: 'Login correcto', token: createToken(user) });

});

function createToken(user) {
    const payload = {
        user_id: user._id,
        user_role: user.role
    }
    return jwt.sign(payload, "secret");
}

module.exports = router;