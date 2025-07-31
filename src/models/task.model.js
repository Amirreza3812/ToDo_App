module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("task", {
    userId: {
      type: DataTypes.INTEGER, // چون به user ربط داره
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modifyDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }
  });

  return Task;
};
