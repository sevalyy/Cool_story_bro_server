const { Router } = require("express");
const router = new Router();
const Space = require("../models").space;

//Get all spaces
router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll();
    res.send(spaces);
  } catch (e) {
    console.log("Error in get space:", e.message);
    next(e);
  }
});

// NEW space
// http :4000/spaces title=Test description=1234
router.post("/", async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).send("You need to login.");
    }
    const userId = user.id; //{name: Kaan, password: 9479, id: 83}
    //getting the space info from the body
    const { title, description } = req.body;
    let newSpace = { title, description, userId };
    //creating a new space
    newSpace = await Space.create(newSpace);

    //sending the created space as a response
    res.send(newSpace);
  } catch (e) {
    console.log("Error in post space:", e.message);
    next(e);
  }
});

//DELETE A space
// http DELETE :4000/spaces/4
router.delete("/space/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    //step 1. find the space to delete
    const spaceToDelete = await Space.findByPk(id);

    //step 2. delete the space
    await spaceToDelete.destroy();

    //step 3. send a string with "deleted"
    res.send({ item: spaceToDelete, deleted: true });
  } catch (e) {
    console.log("Error in delete space:", e.message);
    next(e);
  }
});
//AN OTHER UPDATE
// http PUT :4000/spaces/4 description="...."
router.put("/spaces/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, backgroundColor, color } = req.body;
    const spaceToUpdate = await Space.findByPk(id);
    if (!spaceToUpdate) {
      res.status(404).send("space not found");
    } else {
      const updatedSpace = await spaceToUpdate.update({
        title,
        description,
        backgroundColor,
        color,
      });
      res.json(updatedSpace);
    }
  } catch (e) {
    console.log("Error in put space:", e.message);

    next(e);
  }
});
module.exports = router;
