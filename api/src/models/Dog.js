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
      type: DataTypes.STRING,
      get () {
        const rawValue = this.getDataValue('life_span'); //ver porque no anda esto!
        return rawValue ? rawValue + 'years' : null;
      }
    },
    image : {
      type: DataTypes.STRING (10000),
      defaultValue: "https://images.pexels.com/photos/3299905/pexels-photo-3299905.jpeg?cs=srgb&dl=pexels-goochie-poochie-grooming-3299905.jpg&fm=jpg"
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue: true
    }
  });
};
