module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define(
        "role",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "role",
            timestamps: false
        }
    );
    return Role;
}