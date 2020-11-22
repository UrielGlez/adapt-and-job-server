const async = require("async");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require('config'); 

const jwtKey = config.get("secret.key");

function landing(req, res, next) {
    res.render('index', { title: 'adapt&job' });
}

function signin(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    
    async.parallel({
        user: callback => User.findOne({_email: email})
        .exec(callback)
    }, (err, result) => {
        if(result.user) {
            bcrypt.hash(password, result.user.salt, (err, hash) => {
                if(hash === result.user.password) {
                    res.status(200).json({
                        token: jwt.sign({id: result.user.id}, jwtKey),
                        user: result.user
                    })
                } else {
                    res.status(403).json({
                        message: "Usuario y/o contraseña incorrecto"
                    })
                }
            });
        } else {
            res.status(403).json({
                message: "El usuario no existe"
            })
        }
    })
    
}

function signup(req, res, next) {
    let email = req.body.email;
    let name = req.body.firstName;
    let lastName = req.body.lastName;
    let password = req.body.password;
    
    async.parallel({
        salt: (callback) => {
            bcrypt.genSalt(10, callback);
        },
        }, (err, result) => {
        bcrypt.hash(password, result.salt, (err, hash) => {
            let user = new User({
                _email: email,
                _first_name : name,
                _last_name: lastName,
                _password: hash,
                _salt: result.salt,
            });
    
            user.save().then((obj) => res.status(200).json({
                message: "Usuario creado correctamente",
                objs: obj,
            })).catch((error) => res.status(500).json({
                message: "Error al crear usuario",
                obj: error,
            }));
        });
        }
    );
}

module.exports = {
    landing,
    signin,
    signup
};