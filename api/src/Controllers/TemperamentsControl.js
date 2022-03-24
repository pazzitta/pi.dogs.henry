const axios = require ('axios');
const {Dog, Temperament} = require ('../db')
const {API_KEY1} = process.env

//ANDA AL FIN!

const getAllTemperaments = async (req, res, netx) => {
  try {
    //me traigo la data de la api y saco la data:
    const pedidoApiAll = await axios (`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY1}`);
    const dataApiAll = await pedidoApiAll.data;

    //hago un map para sacarle solo los temperamentos
        let infoApiTemp = dataApiAll?.map (el => {
            if(!el.temperament) return el.temperament = undefined;
        // A todos los demas los spliteo por ", " para añadirlos a un array en la constante aux
        const aux = el.temperament.split(", "); 
        return aux;
            // const todosJuntos = el.temperament;
            // return (todosJuntos)
        })
    
    // intera en los array y devuelve un solo array con todos los elementos y orrdenados alfabéticamente
    const sinEspacios = infoApiTemp.flat().filter(Boolean).sort()
    const stringUnicos = [...new Set(sinEspacios)] //SET El objeto global Set es una estructura de datos, una colección de valores que permite sólo almacenar valores únicos de cualquier tipo, incluso valores primitivos u referencias a objetos.Es posible iterar sobre los elementos en el orden de inserción.
    
    // Encuentro o creo en el modelo de Temperamento, cada temperamento donde el nombre sea igual al dog en el que estoy en ese momento
    stringUnicos.forEach (dog => Temperament.findOrCreate ({
        where : {
            name: dog
        }
    }))

    const busquedaDb = await Temperament.findAll();

    res.send (busquedaDb)    //ya están en la base de datos!
       
    // const vertem = await allInArray();
    // var aux = vertem
    //     .map((e) => {
    //       return {
    //         name: e,
    //       };
    //     })
    //     .filter((e) => e.name);
    // // console.log(vertem);
    // const todos = Temperament.bulkCreate(aux)
    // vertem.map(el => {
    //     Temperament.bulkCreate({
    //         where: { name: el}
    //     })
    // });
    // const enDb = await Temperament.findAll()
    // res.send (enDb)
    // console.log(vertem)
  } catch (error) {
      console.log ('no anda getAllTemperaments')
  }
    
};



module.exports =  {
    getAllTemperaments
}