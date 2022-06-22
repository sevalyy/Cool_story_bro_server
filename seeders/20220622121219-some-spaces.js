"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "spaces",
      [
        {
          title: "Philly",
          description: "Living in Philly as a tourist",
          backgroundColor: "#ffffff",
          color: "#00000",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          title: "Being a programmer",
          description: "How I learned to stop worrying and just writing code!",
          backgroundColor: "#ffffff",
          color: "#00000",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("spaces", null, {});
  },
};
