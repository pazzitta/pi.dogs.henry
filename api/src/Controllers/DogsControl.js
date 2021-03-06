const axios = require ('axios');
const {Dog, Temperament} = require ('../db')
const {API_KEY1} = process.env

//GETs

// All and byName
const getAllDogsApi = async () => {
    try {
        const pedidoApi = await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY1}`);
        const dataApi = await pedidoApi.data;
    
        if (dataApi){
            let infoApi = dataApi?.map (el => {
                let weigth1 = '';
                if (el.weight.metric === "NaN") {
                   weigth1 = "27 - 34"
                } else if (el.weight.metric.split(" - ")[0] === "NaN") {
                    weigth1 = "6 - 8"
                } else {
                    weigth1 = el.weight.metric
                }
                return {
                id: el.id,
                name: el.name,
                temperament: el.temperament? el.temperament : 'Perrito sin temperamento',
                weight: weigth1,
                image : el.image.url,
                }
            })
            // console.log(infoApi)
            return (infoApi)
        }
    } catch (error) {
        console.log ('Error en getAllDogsApi')
  }
};


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

const allInfoApiAndDB = async () => { ///ESTA TENGO QUE USAR PARA LA PR??XIMA RUTA
   try {
       const infApi = await getAllDogsApi ();
       const infDb = await  getAllDogsDB ();
       const allInfo = [...infApi, ...infDb];
       return (allInfo)

   }catch (error) {
       console.log ('Error en allInfoApiAndDB')
   } 
}

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
        console.log ("1", allInfoT)
           res.json(allInfoT)
       }
    }catch (error) {
       next (error)
    }
};


// oneByid

const getDogsForIdDb = async (id) => { 
    try{
        // Me traigo todos los datos de la base de datos
        const resultado = await Dog.findAll({
            where: {
                id: id
            },
            include: Temperament
        })
        // console.log("2", resultado)
        let racesStrig = [];
        for (let i=0; i< resultado.length; i++) {
            var temper = resultado[i].dataValues.temperaments && resultado[i].dataValues.temperaments.map(t=> t.name) 
            var temperaments = temper.join(", ")
            let race = {...resultado[i].dataValues, ["temperament"] : temperaments}
            racesStrig.push(race)

        }         

        const listaDogs = racesStrig.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span + ' years',
                image: dog.image,
                temperament: dog.temperament, 
            }
        })
        // console.log ( "4", listaDogs)
        return listaDogs;
    }
    catch(err){ 
        console.log(err);
        return err;
    }
}

const getoneByIdApi = async (id) => {
    
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

const getById = async (req, res, next) => {
    const {id} = req.params  
    try{
    const allInfoById = await getoneByIdApi(id);
    if (id.length < 4) {
            let infoNecId = allInfoById?.map (el => {
                let weigth1 = '';
                if (el.weight.metric === "NaN") {
                   weigth1 = "27 - 34"
                } else if (el.weight.metric.split(" - ")[0] === "NaN") {
                    weigth1 = "6 - 8"
                } else {
                    weigth1 = el.weight.metric
                }
                return {
                    image: el.image.url,
                    name: el.name,
                    temperament: el.temperament? el.temperament : 'Perrito sin temperamento',
                    weight: weigth1,
                    height: el.height.metric,
                    life_span: el.life_span
                }
            })
            infoNecId.length === 0?
            res.status(404).send ('No se encontr?? el perrito requerido, intentelo de nuevo'):
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
         })
         let temperamentDB = await Temperament.findAll({
                 where: { name: temperament },
               })
             
       await newRace.addTemperament(temperamentDB) 
       //    console.log(newRace) 
        res.send(newRace) 
     }catch (error) {
         console.log('no anda post')
     }

 };



module.exports = {
    getAllDogsAndName, 
    getById, 
    createNewRace
}