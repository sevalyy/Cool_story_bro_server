"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "stories",
      [
        {
          name: "Story 1",
          content: "Living in Philly as a tourist",
          imageUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
        {
          name: "Story 2",
          content: "Living in Amsterdam as a tourist",
          imageUrl: "",
          createdAt: new Date(),
          updatedAt: new Date(),
          spaceId: 1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("stories", null, {});
  },
};
