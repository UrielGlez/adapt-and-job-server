const Workspace = require("../models/workspace");
const User = require("../models/user");

function list(req, res, next) {
  let page = req.params.page ? req.params.page : 1;

  Workspace.paginate({
    $or: [
      {_members: req.user.id},
      {_creator: req.user.id}
    ]
  }, {page: page, limit: 10})
    .then((obj) =>
      res.status(200).json({
        message: "Espacios de trabajo cargados correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al cargar los espacios",
        obj: error,
      })
    );
}

function addUsers(req, res, next) {
  const workspaceId = req.params.id;
  const userId = req.params.id2;

  Workspace.update({ "_id": workspaceId }, { $push: { _members: userId } })
    .then((obj) => {
      User.update({"_id": userId }, { $push: { _workspaces: workspaceId }}).then((obj2) =>
        res.status(200).json({
          message: "Usuario agregado al espacio de trabajo",
          objs: obj2,
        })
      ).catch(
        res.status(500).json({
          message: "Error usuario no encontrado",
          obj: error,
        })
      );
    })
    .catch((error) =>
      res.status(500).json({
        message: "Error espacio de trabajo no encontrado",
        obj: error,
      })
    );

}


function create(req, res, next){
  let title = req.body.title;
  let regulation_link = req.body.regulation_link;
  let description = req.body.description;
  let creator = req.body.creator;

  let workspace = new Workspace({
    _title: title,
    _creator: creator,
    _description: description,
    _regulation_link: regulation_link
  });

  workspace.save().then(obj => res.status(200).json({
    message: "espacio de trabajo creado correctamente",
    objs: obj
  })).catch(error => res.status(500).json({
    message: "error al crear el espacio",
    objs: error
  }));
}

function index(req, res, next) {
  const id = req.params.id;

  Workspace.findOne({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: "Espacio de trabajo cargado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Erros al cargar el espacio",
        obj: error,
      })
    );
}

function replace(req, res, next) {
  let id = req.params.id;

  let title = req.body.title ? req.body.title : "";
  let description = req.body.description ? req.body.description : "";

  let workspace = new Object({
    _title: title,
    _description: description,
  });

  Workspace.findOneAndReplace({ _id: id }, workspace)
    .then((obj) =>
      res.status(200).json({
        message: "Espacio de trabajo modificado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al modificar al espacio",
        obj: error,
      })
    );
}

function update(req, res, next) {
  let id = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  let regulation_link = req.body.regulation_link;

  let workspace = new Object();

  if (title) {
    workspace._title = title;
  }
  if (regulation_link) {
    workspace._regulation_link = regulation_link;
  }
  if (description) {
    workspace._description = description;
  }

  Workspace.findOneAndUpdate({ _id: id }, workspace)
    .then((obj) =>
      res.status(200).json({
        message: "Espacio de trabajo actualizado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al actualizar el espacio de trabajo",
        obj: error,
      })
    );
}

function destroy(req, res, next) {
  const id = req.params.id;

  Workspace.remove({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: "Espacio de trabajo eliminado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al eliminar el espacio de trabajo",
        obj: error,
      })
    );
}

module.exports = {
  list,
  index,
  create,
  addUsers,
  replace,
  update,
  destroy,
};
