const Model = require("../models/bill");

module.exports = {
  //GET ONE BILL
  async getOne(req, res) {
    const { id } = req.params;
    await Model.findById(id)
      .populate("user")
      .populate("id")
      .exec((err, get_one) => {
        res.json(get_one);
      });
  },

  //GET ALL BILLS
  async getAll(req, res) {
    await Model.find()
      .populate("user")
      .populate("products.id")
      .exec((err, get_all) => {
        res.json(get_all);
      });
  },

  //CREATE BILL
  async createB(req, res) {
    console.log("req", req.body);
    const { id, products, total } = req.body;
    console.log("user: ", id);
    console.log("products: ", products);
    console.log("total: ", total);
    const createBill = new Model({
      user: id,
      products,
      total,
    });
    try {
      const createdBill = await createBill.save();
      console.log(createdBill);
      res.send(createdBill);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
