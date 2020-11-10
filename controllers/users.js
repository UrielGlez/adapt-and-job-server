const User = require("../models/user");

function list(req, res, next) {
  let page = req.params.page ? req.params.page : 1;

  User.paginate({}, {page: page, limit: 10})
    .then((obj) =>
      res.status(200).json({
        message: "Ususarios del sistema cargados correctamente", 
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al cargar los usuarios",
        obj: error,
      })
    );
}

function index(req, res, next) {
  const id = req.params.id;

  User.findOne({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: "Usuario cargado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Erros al cargar el usuario",
        obj: error,
      })
    );
}

function replace(req, res, next) {
  let id = req.params.id;

  let email = req.body.email ? req.body.email : "";
  let name = req.body.firstName ? req.body.firstName : "";
  let lastName = req.body.lastName ? req.body.lastName : "";
  let password = req.body.password ? req.body.password : "";

  let user = new Object({
    _email: email,
    _first_name : name,
    _last_name: lastName,
    _password: password,
  });

  User.findOneAndReplace({ _id: id }, user)
    .then((obj) =>
      res.status(200).json({
        message: "Usuario modificao correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al modificar al usuario",
        obj: error,
      })
    );
}

function update(req, res, next) {
  let id = req.params.id;
  let email = req.body.email;
  let name = req.body.firstName;
  let lastName = req.body.lastName;
  let password = req.body.password;

  let user = new Object();

  if (email) {
    user._email = email;
  }
  if (name) {
    user._first_name = name;
  }
  if (lastName) {
    user._last_name = lastName;
  }
  if (password) {
    user._password = password;
  }

  User.findOneAndUpdate({ _id: id }, user)
    .then((obj) =>
      res.status(200).json({
        message: "Usuario actualizado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al actualizar el usuario",
        obj: error,
      })
    );
}

function destroy(req, res, next) {
  const id = req.params.id;
  
  User.remove({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: "Usuario eliminado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al eliminar el usuario",
        obj: error,
      })
    );
}

module.exports = {
  list,
  index,
  replace,
  update,
  destroy,
};