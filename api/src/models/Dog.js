const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true, 
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height : {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    life_span : {
      type: DataTypes.STRING
    },
    image : {
      type: DataTypes.STRING (10000),
      defaultValue: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnutricionistadeperros.com%2Flas-siete-razas-de-perros-para-personas-alergicas%2F&psig=AOvVaw0LdNFcXUeGiByGSEEEu19e&ust=1647180916802000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCMi6vqHhwPYCFQAAAAAdAAAAABAD"
    }
  });
};
