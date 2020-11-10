const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _email: String,
    _first_name: String,
    _last_name: String,
    _role: String,
    _password: String,
    _salt: String
});

class User {

    constructor(email, name, lastName, password, salt) {
        this._email = email;
        this._first_name = name;
        this._last_name = lastName;
        this._password = password;
        this._salt = salt;
    }

    get role() {
        return this._role;
    }

    set role(v) {
        this._role = v;
    }

    get salt() {
        return this._salt;
    }

    set salt(v) {
        this._salt = v;
    }

    get email() {
        return this._email;
    }

    set email(v) {
        this._email = v;
    }

    get name() {
        return this._first_name;
    }

    set name(v) {
        this._first_name = v;
    }

    get lastName() {
        return this._last_name;
    }

    set lastName(v) {
        this._last_name = v;
    }

    get password() {
        return this._password;
    }

    set password(v) {
        this._password = v;
    }
}


schema.plugin(mongoosePaginate)
schema.loadClass(User);
module.exports = mongoose.model('User', schema);