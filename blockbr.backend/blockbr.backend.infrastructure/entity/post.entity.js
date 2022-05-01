const { Sequelize, DataTypes } = require('sequelize');

function PostInstance(sequelize){
    const Post = sequelize.define("posts", {
        Id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: DataTypes.TEXT,
        description: DataTypes.TEXT,
        content: DataTypes.TEXT,
        active: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        schedule: DataTypes.DATE,
        orderpost:DataTypes.INTEGER
    });
    return Post;
}

module.exports = {PostInstance};