module.exports = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    typeOperation: {
      type: DataTypes.ENUM('income', 'expense'),
      allowNull: false,
    },
    sum: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  });
  Transactions.associate = function (models) {
    Transactions.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
  };
  return Transactions;
};
