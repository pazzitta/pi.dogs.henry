const axios = require ('axios');
const {Dog, Temperament} = require ('../db')
const {API_KEY1} = process.env


const allTemRep = async () => {
    try {
        const pedidoApiAll = await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY1}`);
        const dataApiAll = await pedidoApiAll.data;
    
        if (dataApiAll){
            let infoApiTemp = dataApiAll?.map (el => {
                const todosJuntos = el.temperament
                return (todosJuntos)
            })
            return (infoApiTemp)
        }
    } catch (error) {
        console.log ('Error en getAllDogsApi')
  }
}

const allInArray = async () => {
    try {
    let auxiliar = [];
    const arrayOfObjects = await allTemRep ();

    for (i = 0; i < arrayOfObjects.length; i ++) {
        auxiliar.push(i);
    } return (auxiliar)

    }catch (error) {
        console.log ('no anda allInArray')
    }
}

const getAllTemperaments = async (req, res, netx) => {
  try {
    const vertem = await allTemRep();
    res.send (vertem)
  } catch (error) {
      console.log ('no anda getAllTemperaments')
  }
    
};



module.exports =  {
    getAllTemperaments
}