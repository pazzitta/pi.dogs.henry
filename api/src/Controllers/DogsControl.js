const axios = require ('axios');
const {Dog, Temperament} = require ('../db')
const {API_KEY1} = process.env

//GETs (fucnciones previas)
const getAllDogsApi = async () => {
    try {
        const pedidoApi = await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY1}`);
        const dataApi = await pedidoApi.data;
    
        if (dataApi){
            let infoApi = dataApi.map (el => {
                return {
                id: el.id,
                name: el.name,
                temperament: el.temperament? el.temperament : 'Perrito sin temperamento',
                weight: el.weight.metric,
                image : el.image.url,
                }
            })
            return (infoApi)
        }
    } catch (error) {
        console.log ('Error en getAllDogsApi')
  }
};

const getAllDogsDB = async () => {
    try {
        return await Dog.findAll ({include: Temperament} )
    }catch (error) {
        console.log ('Error en getAllDogsDB')
  }
};

const allInfoApiAndDB = async () => { ///ESTA TENGO QUE USAR PARA LA PRÓXIMA RUTA
   try {

   }catch (error) {
       console.log ('Error en allInfoApiAndDB')
   }
    const infApi = await getAllDogsApi ();
    const infDb = await  getAllDogsDB ();
    const allInfo = [...infApi, ...infDb];
    return (allInfo)
}

//GET (para la ruta)
const getAllDogsAndName = async (req, res, next) => {
     try {
        const {name} = req.query;
        const allInfoT = await allInfoApiAndDB();

        if (name) {
           let dogsByName = allInfoT.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
           recipeForName.length?
           res.status(200).send(dogsByName):
           res.status(404).send('Disculpe, la raza no fue encontrada, intente con otra')       
        } else {
            res.json(allInfoT)
        }
     }catch (error) {
        next (error)
     }
};

const getById = () => {

};

//POST
 const createNewRace = () => {

 };



module.exports = {
    getAllDogsAndName, 
    getById, 
    createNewRace
}