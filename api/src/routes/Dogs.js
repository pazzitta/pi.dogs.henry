const {Router} = require ('express');
const {getAllDogsAndName, getById, createNewRace} = require ('../Controllers/DogsControl')


const router = Router ();

//GET
router.get ('/get', getAllDogsAndName) //todos y el name por query
router.get ('/:idRaza', getById)
//POST
router.post ('/create', createNewRace)

module.exports = router;