import React, { useState } from "react";
import BarraSup from "../BarraPinta/BarraSup";
import './NewRace.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { getAllTemperaments } from "../../Redux/actions";

//validaciones
export function validate (input) {
   let errors = {};
   if (!input.nombre) {
      errors.nombre = "Campo requerido"
   }else if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.nombre)) {
      errors.nombre= "Ingrese la primera letra en Mayúscula, solo letras y números"
   }

   if (!input.alturaMin) {
      errors.alturaMin = "Campo requerido"
   }else if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.alturaMin)) {
      errors.alturaMin = "Ingrese solo números enteros"
   }

   if (!input.alturaMax) {
      errors.alturaMax = "Campo requerido"
   }else if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.alturaMax)) {
      errors.alturaMax = "Ingrese solo números enteros"
   }
   
   if (!input.pesoMin) {
      errors.pesoMin = "Campo requerido"
   }else if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.pesoMin)) {
      errors.pesoMin = "Ingrese solo números enteros"
   }

   if (!input.pesoMax) {
      errors.pesoMax = "Campo requerido"
   }else if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.pesoMax)) {
      errors.pesoMax = "Ingrese solo números enteros"
   }

   if (!input.vida) {
      errors.vida = "Campo requerido"
   }else if (!/^[A-Z]+[A-Za-z0-9\s]+$/g.test(input.vida)) {
      errors.vida = "Ingrese solo números enteros"
   }

   return errors
}

export default function NewRace () {

const dogtemperaments = useSelector ((state) => state.temperaments);
const dispatch = useDispatch ();

useEffect(() => {
    dispatch(getAllTemperaments())
},[dispatch])

// Inputs 
const [input, setInput] = useState ({
      nombre: '',
      alturaMin: '',
      alturaMax :'',
      pesoMin: '',
      pesoMax: '',
      vida: '',
      temperament: []
})

const [errors, setErrors] = useState ({
      nombre: 'Campo requerido',
      alturaMin: 'Campo requerido',
      alturaMax :'Campo requerido',
      pesoMin: 'Campo requerido',
      pesoMax: 'Campo requerido',
      vida: 'Campo requerido',
})

const handleInputChange = (e) => {
   console.log (e)
   e.preventDefault ();
   setInput ( {
      ...input,
      [e.target.name]: e.target.value
   })
   setErrors (validate ({
      ...input,
      [e.target.name]: e.target.value
   })
  );
}

    return (
        <div>
           <BarraSup/>  
           
           <div>
           <Link to='/home' id="click">
                 <button className="buttonVolver">VOLVER</button>
            </Link>
           </div>   
           
           <div className="imageF">
           
           <div>
              <form className="fondoGris">
                  <div className="tituloCrear">CREA TU PROPIA RAZA</div>
                  
                  <div className="cajaname">
                  <label className="textName">Nombre</label>
                  <br/>
                 
                  <div>
                     <input className="barraName" placeholder="nombre" type= "text" name="nombre" value={input.nombre} onChange={handleInputChange} />
                     {errors.nombre && (
                        <p className="valNombre"> {errors.nombre} </p> 
                     )}
                  </div>
                 
                  </div>
                  <br/>
                  
                  <div className="cajaAltura">
                  <label className="textAltura">Altura</label>
                  <br/>
                  
                  {/* <div className="cajaMinMax"> */}
                     <input className="barraAlturaMin" placeholder="min" type= "text" name="alturaMin" value={input.alturaMin} onChange={handleInputChange}/>
                     {errors.alturaMin && (
                        <p className="valAMin"> {errors.alturaMin} </p> 
                     )}
                  <div className="cajaMinMax">   
                  <input className="barraAlturaMax" placeholder="max" type= "text" name="alturaMax" value={input.alturaMax} onChange={handleInputChange}/>
                     {errors.alturaMax && (
                        <p className="valAMax"> {errors.alturaMax} </p> 
                     )}
                  </div>      
                  
                  </div>
                  <br/>

                  <label className="textPeso">Peso</label>
                  <div >
                     <input className="barraPesoMin" placeholder="min" type= "text" name="pesoMin" value={input.pesoMin} onChange={handleInputChange}/>
                     {/* {errors.pesoMin && (
                        <p className="valPMin"> {errors.pesoMin} </p> 
                     )} */}
                     <input className="barraPesoMax" placeholder="max" type= "text" name="pesoMax" value={input.pesoMax} onChange={handleInputChange}/>
                     {/* {errors.pesoMax && (
                        <p className="valPMax"> {errors.pesoMax} </p> 
                     )} */}
                  </div>
                  
                  <label className="textLife">Años de vida</label>
                  <input className="barraLife" placeholder="life" type= "text" name="vida" value={input.vida} onChange={handleInputChange}/>
                  {/* {errors.vida && (
                        <p className="valVida"> {errors.vida} </p> 
                     )} */}

                  <select className="selecTemp" >
                     <option disabled selected>Elegir temperamento/s</option>
                        {dogtemperaments.map((dt)=>(
                              <option  key={dt} value={dt}>{dt}</option>
                           ))}
                  </select>

                  <button className="crear">CREAR</button>
                  
              </form>
           </div>
           
           </div>       
        
        </div>
    )
}
