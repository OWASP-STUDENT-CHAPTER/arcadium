const router = require("express").Router();

const isAuthenticated = require("../middleware/isAuthenticated");
const Room = require("../model/roomModel");
const { PROPERTY_COLORS } = require("../util/CONSTANTS");
//Model
const Property = require("./model");

const { createPropertyValidator } = require("./validator");

// router.get("/addFakePropertyData", async (req, res) => {
//   for (let i = 1; i <= 40; i++) {
//     const newProperty = new Property({
//       _id: i,
//       name: `name: ${i}`,
//       price: i * 100,
//       colorGroup: PROPERTY_COLORS[i % PROPERTY_COLORS.length],
//       imgUrl: `${i}`,
//     });

//     await newProperty.save();
//     console.log("added", i);
//   }

//   res.send("done ");
// });

//Get all properties for you room
router.get("/room", isAuthenticated, async (req, res) => {
  try {
    const properties = await Property.find();

    const room = await Room.findById(req.user.room);
    console.log("room", room);

    res.send({ data: { properties, ownershipMap: room.ownershipMap } });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      error: "Server Error",
    });
  }
});

router.post("/buy", isAuthenticated, async (req, res) => {
  const room = await Room.findById(req.user.room);
  const property = await Property.findById(req.user.game.posIndex + 1); //! chnage

  console.log("req.user.game.posIndex", req.user.game.posIndex);
  console.log(property);

  //! ask for property??

  if (room.ownershipMap[property._id])
    return res.status(400).send({ error: "already bought by someone" });

  if (req.user.game.money < property.price)
    return res.status(400).send({ error: "insufficient balance" });

  const price = property.price - req.user.game.currentReduction;

  // const price =
  //   property.price - (property.price * req.user.game.currentReduction) / 100;
  req.user.game.money -= price;
  room.ownershipMap[property._id] = req.user._id;

  await room.save();
  await req.user.save();

  res.send({ msg: "bought" });
});

//Create property
router.post("/createProperty", async (req, res) => {
  const { value, error } = createPropertyValidator(req.body);
  if (error)
    return res
      .status(400)
      .send({ error: error.details[0].message, messgae: "invalid fields" });

  try {
    const newProperty = new Property({
      ...value,
    });
    await newProperty.save();

    res.send({ data: newProperty });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({
      error: "Server Error-- retry",
      messgae: "name is supposed to be unique",
    });
  }
});

module.exports = router;
