const Model = require("../models/user");
const bcrypt = require("bcrypt");

module.exports = {
  //GET ONE USER
  async getOne(req, res) {
    const { id } = req.params;
    await Model.findById(id)
      .populate("role")
      .exec((err, get_one) => {
        res.json(get_one);
      });
    /*const db = await con_mongodb();
    let get_one = await db
      .collection("users")
      .find({ _id: ObjectID(id) })
      .toArray();
    //res.json(get_one);*/
  },

  //GET ALL USERS
  async getAll(req, res) {
    await Model.find()
      .populate("role")
      .exec((err, get_all) => {
        res.json(get_all);
      });
    //const db = await con_mongodb();
    //let get_all = await db.collection("users").find({}).toArray();
    //const get_all = await Model.find();
  },

  //CREATE USER
  async createU(req, res) {
    const { name, email, password, role } = req.body;
    const emailExist = await Model.findOne({ email: email });
    if (emailExist) return res.status(400).send("Email already exists.");
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const createUser = new Model({
      name,
      email,
      password: hashPassword,
      role: role,
    });
    try {
      const createdUser = await createUser.save();
      res.json({
        message: `User ${name} created.`,
      });
    } catch (error) {
      res.status(400).send(error);
    }
    //const db = await con_mongodb();
    //await db.collection("users").insertOne(createUser);
  },

  //UPDATE USER
  async updateU(req, res) {
    const { id } = req.params;
    const { name, email, password, _id, role } = req.body;
    //hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    await Model.findByIdAndUpdate(
      id,
      {
        $set: { name, email, password: hashPassword, role },
      },
      { useFindAndModify: false }
    );
    /*const db = await con_mongodb();
    const updateUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      location: req.body.location,
    };
    await db.collection("users").updateOne({ _id: ObjectID(id) }, { $set: updateUser });
    */
    res.json({ message: `User ${name} updated.` });
  },
  //DELETE
  async deleteU(req, res) {
    const { id } = req.params;
    await Model.findByIdAndDelete(id);
    /*const db = await con_mongodb();
    await db.collection("users").findOneAndDelete({ _id: ObjectID(id) });
    */
    res.json({
      message: `User ${id} deleted.`,
    });
  },

  //ASSING ROLE
  async assignRole(req, res) {
    const { id } = req.params;
    const { role } = req.body;
    await Model.findByIdAndUpdate(id, { $push: { role: role } });
    /*const db = await con_mongodb();
    let get_role = await db
      .collection("roles")
      .find({ _id: ObjectID(role) })
      .toArray();
    await db
      .collection("users")
      .updateOne({ _id: ObjectID(id) }, { $set: { role: get_role } });
    */
    res.json({
      message: `Role ${role} assigned.`,
    });
  },
  //ASSIGN LOCATIONS
  async assignLocations(req, res) {
    const { id } = req.params;
    const { direction, latitude, longitude } = req.body;
    await Model.findByIdAndUpdate(id, {
      $push: {
        locations: {
          direction: direction,
          latitude: latitude,
          longitude: longitude,
        },
      },
    });
    res.json({
      message: `direction ${direction} assigned.`,
    });
  },
};
