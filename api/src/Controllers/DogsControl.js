const axios = require ('axios');
const {Dog, Temperament} = require ('../db')
const {API_KEY1} = process.env

//GETs (fucnciones previas)
//all
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
                weight: el.weight.metric !== "NaN" ? el.weight.metric : "27-34" ,
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
        return await Dog.findAll({
          include: {
            model: Temperament,
            attributes: ["name"], //traigo el nombre de los temperamentos
            through: {
              attributes: [], //tomo solo lo que queda en el arreglo atributes
            },
          },
        });
      } catch (error) {
        console.log("Hubo un error en getDbInfo", error)
      }
    };

// const getAllDogsDB = async () => {
//     try {
//         return await Dog.findAll ({include: Temperament} )
//     }catch (error) {
//         console.log ('Error en getAllDogsDB')
//   }
// };

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

//byId

const oneById = async (id) => {
    
    try {
        const allForFilter = await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY1}`);
     if (id) {
        const result = allForFilter.data.filter(e => e.id === Number(id));
        return(result);
    }       

    }catch (error) {
        console.log('Error en oneById')
    }
  // if(id) {
    //     let oneById = await allForFilter.data.filter (el => el.id.toString() === el.id.toString()); 
    //     return (oneById)
    // }
}

const oneByDB = async (id) => {
    return await Dog.findByPk(id, {
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

//GET (para la ruta)
const getAllDogsAndName = async (req, res, next) => {
     try {
        const {name} = req.query;
        const allInfoT = await allInfoApiAndDB();

        if (name) {
           let dogsByName = allInfoT.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
           dogsByName.length?
           res.send(dogsByName):
           res.status(404).send('Disculpe, la raza no fue encontrada, intente con otra')       
        } else {
            res.json(allInfoT)
        }
     }catch (error) {
        next (error)
     }
};

const getById = async (req, res, next) => {
    const {id} = req.params 
    try{
    const allInfoById = await oneById(id);
    if (id.length < 4) {
            let infoNecId = allInfoById?.map (el => {
                return {
                    image: el.image.url,
                    name: el.name,
                    temperament: el.temperament? el.temperament : 'Perrito sin temperamento',
                    weight: el.weight.metric !== "NaN" ? el.weight.metric : "27-34",
                    height: el.height.metric,
                    life_span: el.life_span
                }
            })
            infoNecId.length === 0?
            res.status(404).send ('No se encontró el perrito requerido, intentelo de nuevo'):
            res.send (infoNecId)
        } else {
            let infoDbById = await oneByDB (id);            
            return res.json(infoDbById)
        }
    } catch (error) {
        next (error)
    }

};

//POST 

//el post anda pero me pasa lo mismo que antes con los temperamentos, no los agrega! 
 const createNewRace = async (req, res) => {
     try{
         const {name, heightMin, heightMax , weightMin, weightMax, life_span, image, temperament} = req.body;
         const newRace = await Dog.create({
            name,
            height: `${heightMin.trim()} - ${heightMax.trim()}`,
            weight: `${weightMin.trim()} - ${weightMax.trim()}`,
            life_span,
            image
            // id Ver si por esto no anda el detail 
         })
         let temperamentDB = await Temperament.findAll({
                 where: { name: temperament },
               })
        console.log(temperamentDB)      
       await newRace.addTemperament(temperamentDB)
       
        res.send(newRace) 
     }catch (error) {
         console.log('no anda post')
     }

 };
 //ME TRAE OBJETOS DENTRO DE UN ARRAY, LO TENGO QUE MAPAR Y SACAR SOLO EL STRIG


module.exports = {
    getAllDogsAndName, 
    getById, 
    createNewRace
}