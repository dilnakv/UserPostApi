module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "user",
            timestamps: false
        }
    );
    return User;
}