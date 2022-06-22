const { Router } = require("express");
const router = new Router();
const Story = require("../models").story;
const authMiddleWare = require("../auth/middleware");

//Get all stories
router.get("/", async (req, res, next) => {
  try {
    const stories = await Story.findAll();
    res.send(stories);
  } catch (e) {
    console.log("Error in get story:", e.message);
    next(e);
  }
});

// NEW story
// http :4000/stories name=Test content=uhb imageUrl=poi
router.post("/", authMiddleWare, async (req, res, next) => {
  const userId = req.user.id;
  try {
    //getting the story info from the body
    const { name, content, imageUrl } = req.body;

    //creating a new story
    const newStory = await Story.create({ name, content, imageUrl });

    //sending the created story as a response
    res.send(newStory);
  } catch (e) {
    console.log("Error in post story:", e.message);
    next(e);
  }
});

//DELETE A story
// http DELETE :4000/stories/4
router.delete("/story/:id", authMiddleWare, async (req, res, next) => {
  try {
    const { id } = req.params;

    //step 1. find the story to delete
    const storyToDelete = await Story.findByPk(id);

    //step 2. delete the story
    await storyToDelete.destroy();

    //step 3. send a string with "deleted"
    res.send({ item: storyToDelete, deleted: true });
  } catch (e) {
    console.log("Error in delete story:", e.message);
    next(e);
  }
});
//AN OTHER UPDATE
// http PUT :4000/stories/4 description="...."
router.put("/stories/:id", authMiddleWare, async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { name, content, imageUrl } = req.body;
    const storyToUpdate = await Story.findByPk(id);
    if (!storyToUpdate) {
      res.status(404).send("story not found");
    } else {
      const updatedStory = await storyToUpdate.update({
        name,
        content,
        imageUrl,
      });
      res.json(updatedStory);
    }
  } catch (e) {
    console.log("Error in put story:", e.message);
    next(e);
  }
});
module.exports = router;
