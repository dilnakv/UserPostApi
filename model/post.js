module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        "post",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "post",
            timestamps: false
        }
    );
    return Post;
}