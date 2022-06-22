"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await [
      queryInterface.addColumn("spaces", "userId", {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }),
      queryInterface.addColumn("stories", "spaceId", {
        type: Sequelize.INTEGER,
        references: {
          model: "spaces",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }),
    ];
  },

  async down(queryInterface, Sequelize) {
    await [
      queryInterface.removeColumn("spaces", "userId"),
      queryInterface.removeColumn("stories", "spaceId"),
    ];
  },
};
