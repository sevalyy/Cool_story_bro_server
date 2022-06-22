const { User, Space, Story } = require("./models");

//get all users
async function getUsers() {
  const allUsers = await User.findAll({
    include: { model: space, attributes: ["title"] },
  });
  return allUsers.map((user) => user.toJSON());
}
