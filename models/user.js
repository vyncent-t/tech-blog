const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");
const bcrypt = require('bcrypt');

class User extends Model {
    checkPassword(userPassword) {
        return bcrypt.compareSync(userPassword, this.password);
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    hooks: {
        beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hashSync(newUserData.password, 10);
            return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
            if (updatedUserData.password) {
                updatedUserData.password = await bcrypt.hashSync(updatedUserData.password, 10);
            }
            return updatedUserData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
}
)

module.exports = User;