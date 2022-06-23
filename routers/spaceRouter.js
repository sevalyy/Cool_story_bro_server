const { Router } = require("express");
const router = new Router();
const Space = require("../models").space;
const Story = require("../models").story;
const authMiddleWare = require("../auth/middleware");

//Get all spaces - homepage
router.get("/", async (req, res, next) => {
  try {
    const spaces = await Space.findAll({ include: [Story] });
    res.send(spaces);
  } catch (e) {
    console.log("Error in get space:", e.message);
    next(e);
  }
});

// for the details page- findByPk
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const space = await Space.findByPk(id, { include: [Story] });
    res.send(space);
  } catch (e) {
    console.log("Error in get space details page :", e.message);
    next(e);
  }
});

// NEW space
// http :4000/spaces title=Test description=blabla
router.post("/", authMiddleWare, async (req, res, next) => {
  try {
    const user = req.user;

    // bu if'e middelware'den gectigi icin artik gerek kalmadi.
    // if (!user) {
    //   return res.status(401).send("You need to login.");
    // }

    const userId = user.id; //{name: Seval, password: 9479, id: 83}
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

// // put - update space details
// router.patch("/:id", auth, async (req, res) => {
//   const space = await Space.findByPk(req.params.id);
//   if (!space.userId === req.user.id) {
//     return res
//       .status(403)
//       .send({ message: "You are not authorized to update this space" });
//   }

//DELETE A space
// http DELETE :4000/spaces/4
router.delete("/space/:id", authMiddleWare, async (req, res, next) => {
  try {
    //get userId from req that we put in middelware. !!! important !!!
    const userId = req.user.id;

    const { id } = req.params;

    //step 1. find the space to delete
    const spaceToDelete = await Space.findByPk(id);
    if (spaceToDelete.userId !== userId) {
      return res.status(401).send({ error: "not allowed" });
    }
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
router.put("/spaces/:id", authMiddleWare, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const id = parseInt(req.params.id);
    const { title, description, backgroundColor, color } = req.body;
    const spaceToUpdate = await Space.findByPk(id);
    if (!spaceToUpdate) {
      return res.status(404).send("space not found");
    }

    if (spaceToUpdate.userId !== userId) {
      return res.status(401).send({ error: "not allowed" });
    }

    const updatedSpace = await spaceToUpdate.update({
      title,
      description,
      backgroundColor,
      color,
    });
    res.json(updatedSpace);
  } catch (e) {
    console.log("Error in put space:", e.message);

    next(e);
  }
});
module.exports = router;
