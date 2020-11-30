const SupportMaterial = require("../models/supportmaterial");

function list(req, res, next) {
  let page = req.params.page ? req.params.page : 1;
  let space = req.params.space;

  SupportMaterial.paginate({
    _space: space
  }, {page: page, limit: 20})
    .then((obj) =>
      res.status(200).json({
        message: "Materiales cargados correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al cargar los materiales",
        obj: error,
      })
    );
}

function create(req, res, next) {
  let title = req.body.title;
  let link = req.body.link;
  let description = req.body.description;
  let space = req.body.space;
  let creator_name = req.body.creator_name
  let creator = req.body.creator;

  let material = new SupportMaterial({
    _title: title,
    _creator: creator,
    _creator_name: creator_name,
    _description: description,
    _link: link,
    _space: space
  });

  material.save().then(obj => res.status(200).json({
    message: "Material guardado correctamente",
    objs: obj
  })).catch(error => res.status(500).json({
    message: "Error al guardar el material",
    objs: error
  }));
}

function index(req, res, next) {
  const id = req.params.id;

  SupportMaterial.findOne({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: "Material cargado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al cargar el material",
        obj: error,
      })
    );
}

function update(req, res, next) {
  let id = req.params.id;
  let title = req.body.title;
  let description = req.body.description;
  let link = req.body.link;

  let workspace = new Object();

  if (title) {
    workspace._title = title;
  }
  if (link) {
    workspace._link = link;
  }
  if (description) {
    workspace._description = description;
  }

  SupportMaterial.findOneAndUpdate({ _id: id }, workspace)
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

  SupportMaterial.remove({ _id: id })
    .then((obj) =>
      res.status(200).json({
        message: "Material eliminado correctamente",
        objs: obj,
      })
    )
    .catch((error) =>
      res.status(500).json({
        message: "Error al eliminar el material",
        obj: error,
      })
    );
}

module.exports = {
  list,
  index,
  create,
  update,
  destroy,
};