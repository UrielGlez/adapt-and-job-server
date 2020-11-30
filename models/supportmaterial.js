const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _title: String,
    _creator: String,
    _creator_name: String,
    _description: String,
    _link: String,
    _space: String
});

class SupportMaterial {

    constructor(title, description, link, space, creator, creator_name) {
        this._title = title;
        this._description = description;
        this._link = link;
        this._creator = creator;
        this._creator_name = creator_name;
        this._space = space;
    }

    get creator_name() {
        return this._creator_name;
    }

    set creator_name(v) {
        this._creator_name = v;
    }

    get creator() {
        return this._creator;
    }

    set creator(v) {
        this._creator = v;
    }

    get space() {
        return this._space;
    }

    set space(v) {
        this._space = v;
    }

    get link() {
        return this._link;
    }

    set link(v) {
        this._link = v;
    }

    get description() {
        return this._description;
    }

    set description(v) {
        this._description = v;
    }

    get title() {
        return this._title;
    }

    set title(v) {
        this._title = v;
    }
}

schema.plugin(mongoosePaginate)
schema.loadClass(SupportMaterial);
module.exports = mongoose.model('SupportMaterial', schema);