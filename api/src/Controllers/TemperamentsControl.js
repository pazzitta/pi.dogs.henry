const axios = require ('axios');
const {Dog, Temperament} = require ('../db')
const {API_KEY1} = process.env


const allTemRep = async () => {
    try {
        const allTemperaments = await Temperament.findAll();
        if (allTemperaments.length === 0) {
            const pedidoApiAll = await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY1}`);
            const dataApiAll = await pedidoApiAll.data;
        
            if (dataApiAll){
                let infoApiTemp = dataApiAll?.map (el => {
                    const todosJuntos = el.temperament;
                    return (todosJuntos)
                })
                // console.log(infoApiTemp)
                return (infoApiTemp)
            }
        }
    } catch (error) {
        console.log ('Error en getAllDogsApi')
  }
}

const allInArray = async () => {
    try {
    const arrayOfObjects = await allTemRep ();
    const sinEspacios = arrayOfObjects.map((e) => e && e.split(", ")).flat().sort(); // intera en los array y devuelve un solo array con todos los elementos y orrdenados alfabéticamente
    const stringUnicos = [...new Set(sinEspacios)] // SET El objeto global Set es una estructura de datos, una colección de valores que permite sólo almacenar valores únicos de cualquier tipo, incluso valores primitivos u referencias a objetos.Es posible iterar sobre los elementos en el orden de inserción.
    return stringUnicos; 
    }catch (error) {
        console.log ('no anda allInArray')
    }
}

//en teorìa está creado en la base de datos...pero tira error!

const getAllTemperaments = async (req, res, netx) => {
  try {
    const vertem = await allInArray();
    vertem.map(el => {
        Temperament.bulkCreate({
            where: { name: el}
        })
    });
    res.send (vertem)
    // console.log(vertem)
  } catch (error) {
      console.log ('no anda getAllTemperaments')
  }
    
};



module.exports =  {
    getAllTemperaments
}