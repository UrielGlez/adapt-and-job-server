const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = mongoose.Schema({
    _title: String,
    _creator: String,
    _description: String,
    _regulation_link: String,
    _members: {type: [String], default: undefined}
});

class Workspace {

    constructor(title, description, members, regulation_link) {
        this._title = title;
        this._description = description;
        this._members = members;
        this._regulation_link = regulation_link;
    }

    get regulation_link() {
        return this._regulation_link;
    }

    set regulation_link(v) {
        this._regulation_link = v;
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
schema.loadClass(Workspace);
module.exports = mongoose.model('Workspace', schema);
