const Model = require("../models/role");

module.exports = {
  //GET ONE ROLE
  async getOne(req, res) {
    const { id } = req.params;
    await Model.findById(id).exec((err, get_one) => {
      res.json(get_one);
    });

    /*const db = await con_mongodb();
    let get_all = await db
      .collection("roles")
      .find({ _id: ObjectID(id) })
      .toArray();
    res.json(get_all);*/
  },

  //GET ALL ROLES
  async getAll(req, res) {
    await Model.find().exec((err, get_all) => {
      res.json(get_all);
    });
    /*const db = await con_mongodb();
    let get_one = await db.collection("roles").find({}).toArray();
    res.json(get_one);*/
  },
  //CREATE ROLES
  async createR(req, res) {
    const { name } = req.body;
    const createRole = new Model({
      name,
    });
    await createRole.save();
    /*let name = req.body.name;
    const db = await con_mongodb();
    await db.collection("roles").insertOne({
      name: name,
    });*/
    res.json({
      message: `roles ${name} created.`,
    });
  },

  //UPDATE ROLES
  async updateR(req, res) {
    const { id } = req.params;
    const { name } = req.body;
    await Model.findByIdAndUpdate(
      id,
      {
        $set: { name },
      },
      { useFindAndModify: false }
    );
    /*const db = await con_mongodb();
    const updateRole = {
      name: req.body.name,
    };
    await db.collection("roles").updateOne({ _id: ObjectID(id) }, { $set: updateRole });
    res.json({ message: `Role ${id} updated.` });
  },
  async deleteR(req, res) {
    const { id } = req.params;
    const db = await con_mongodb();
    await db.collection("roles").findOneAndDelete({ _id: ObjectID(id) });*/
    res.json({
      message: `Role ${id} updated.`,
    });
  },
  //DELETE
  async deleteR(req, res) {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    /*const db = await con_mongodb();
    await db.collection("users").findOneAndDelete({ _id: ObjectID(id) });
    */
    res.json({
      message: `Role ${id} deleted.`,
    });
  },
};
