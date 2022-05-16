const con_mongodb = require("../config/con_mongodb");
const Model = require("../models/product");

module.exports = {
  //GET ONE PRODUCT
  async getOne(req, res) {
    const { id } = req.params;
    await Model.findById(id).exec((err, get_one) => {
      res.json(get_one);
    });
    /*const db = await con_mongodb();
    let get_all = await db
      .collection("products")
      .find({ _id: ObjectID(id) })
      .toArray();
    res.json(get_all);*/
  },

  //GET ALL PRODUCTS
  async getAll(req, res) {
    await Model.find().exec((err, get_all) => {
      res.json(get_all);
    });
    /*const db = await con_mongodb();
    let get_one = await db.collection("products").find({}).toArray();
    res.json(get_one);*/
  },

  //CREATE PRODUCT
  async createP(req, res) {
    const { name, description, price } = req.body;
    const createRole = new Model({
      name,
      description,
      price,
    });
    await createRole.save();
    /*let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;

    const db = await con_mongodb();
    await db.collection("products").insertOne({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    });*/
    res.json({
      message: `Product ${name} created.`,
    });
  },

  //UPDATE PRODUCT
  async updateP(req, res) {
    const { id } = req.params;
    const { name, description, price } = req.body;
    await Model.findByIdAndUpdate(
      id,
      {
        $set: { name, description, price },
      },
      { useFindAndModify: false }
    );
    /*const db = await con_mongodb();
    const updateproduct = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    await db.collection("products").updateOne({ _id: ObjectID(id) }, { $set: updateProduct });*/
    res.json({ message: `Product ${id} updated.` });
  },

  //DELETE
  async deleteP(req, res) {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    /*const db = await con_mongodb();
    await db.collection("Products").findOneAndDelete({ _id: ObjectID(id) });*/
    res.json({
      message: `Product ${id} deleted.`,
    });
  },
};
