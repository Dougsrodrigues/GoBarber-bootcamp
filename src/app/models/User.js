const brcrypt = require("bcryptjs"); // modulo de codificador de senha

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.STRING,
      provider: DataTypes.BOOLEAN
    },
    {
      hooks: {
        //hooks = func disparadas antes das ações

        beforeSave: async user => {
          //FAzendo a codificação da senha antes de ser enviada ao BD
          if (user.password) {
            user.password_hash = await brcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );
  // COmparando a password com a password_hash
  User.prototype.checkPassword = function(password) {
    return brcrypt.compare(password, this.password_hash);
  };

  return User;
};
