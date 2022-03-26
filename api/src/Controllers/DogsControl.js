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

// const getAllDogsDB = async () => {
//     try {
//         return await Dog.findAll({
//           include: {
//             model: Temperament,
//             attributes: ["name"], //traigo el nombre de los temperamentos
//             through: {
//               attributes: [], //tomo solo lo que queda en el arreglo atributes
//             },
//           },
//         });
//       } catch (error) {
//         console.log("Hubo un error en getDbInfo", error)
//       }
//     };

const getAllDogsDB = async () => {
        try {

            let races = await Dog.findAll({
              include: {
                model: Temperament,
                attributes: ["name"], //traigo el nombre de los temperamentos
                through: {
                  attributes: [], //tomo solo lo que queda en el arreglo atributes
                },
              },
            });
            let racesStrig = [];
            for (let i=0; i< races.length; i++) {
                var temper = races[i].dataValues.temperaments && races[i].dataValues.temperaments.map(t=> t.name) 
                var temperaments = temper.join(", ")
                let race = {...races[i].dataValues, ["temperament"] : temperaments}
                racesStrig.push(race)

            } 
            
            //  console.log(races)
            return racesStrig
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

//by id!
// Query a la base de datos en el cual traera solo los que contengan el id
const getDogsForIdDb = async (id) => { 
    try{
        // Me traigo todos los datos de la base de datos
        const resultado = await Dog.findAll({
            where: {
                id: id
            },
            include: Temperament
        })
        console.log("1", resultado)
        //ahy que arreglar lo de los temperamentos...
        let racesStrig = [];
        for (let i=0; i< resultado.length; i++) {
            var temper = resultado[i].dataValues.temperaments && resultado[i].dataValues.temperaments.map(t=> t.name) 
            var temperaments = temper.join(", ")
            let race = {...resultado[i].dataValues, ["temperament"] : temperaments}
            racesStrig.push(race)

        } 
        
        //  console.log(races)
        // return racesStrig 
       
        // const listaTemperamentos = resultado[0].temperaments.map(temp => temp.nombre)

        const listaDogs = racesStrig.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
                image: dog.image,
                temperament: dog.temperament, 
            }
        })
        // console.log (listaDogs)
        return listaDogs;
    }
    // Si algo sale mal entrar aqui en el catch
    catch(err){ 
        console.log(err);
        return err;
    }
}

//byId mio

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
}

// const oneByDB = async (id) => {
//     return await Dog.findByPk(id, {
//         include: {
//             model: Temperament,
//             attributes: ['name'],
//             through: {
//                 attributes: [],
//             }
//         }
//     });
    
// }



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
    const {id} = req.params  //así está destructurado y así: const id = req.params.id, no.
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
            let infoDbById = await getDogsForIdDb (id);
            console.log (infoDbById)            
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
         const {name, heightMin, heightMax , weightMin, weightMax, life_span, image, temperament, createdInDb } = req.body;
         const newRace = await Dog.create({
            name,
            height: `${heightMin.trim()} - ${heightMax.trim()}`,
            weight: `${weightMin.trim()} - ${weightMax.trim()}`,
            life_span,
            image,
            createdInDb
            // id Ver si por esto no anda el detail 
         })
         let temperamentDB = await Temperament.findAll({
                 where: { name: temperament },
               })
             
       await newRace.addTemperament(temperamentDB) //este await no lo pone selene, ver si anda sin
       let race =  await Dog.findOne({where : {name: name}}, {include: {model: Temperament}})    
       //    console.log(newRace) 
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