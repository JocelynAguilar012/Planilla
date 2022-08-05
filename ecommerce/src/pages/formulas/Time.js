import React, { useState } from 'react'

export const Time = () => {
    const [inputs, setinputs] = useState({
        Tipo:"",
        TipoAplic:"",
        Nombre:"",
        Estado:""
    });
    const changeForm= async e=>{
        e.preventDefault();
        //console.log(e.target.value);
        //console.log(e.target.name);
		setinputs({
			...inputs,
			[e.target.name]:e.target.value
		});
        //console.log(inputs);
}
  return (
    <>
     <h2>Time</h2>
  <form onChange={changeForm}>
    <p>Company: Object ID</p>
  <label for="Tipo">Tipo: </label>
    <select name="Tipo" id="Tipo">
    <option value="Personal" name='Personal'>Personal</option>
    <option value="Empresa" name='Empresa'>Empresa</option>
  </select>
  <br/>
  <br/>
  <label for="TipoAplic">Tipo Aplicacion: </label>
    <select name="TipoAplic" id="TipoAplic">
    <option value="Suma" name='Suma'>Suma</option>
    <option value="Resta" name='Resta'>Resta</option>
  </select>
  <br/>
  <br/>
  <label>Nombre: </label>
  <input name='Nombre'></input>
  <br/>
  <br/>
  <label for="Estado">Estado: </label>
    <select name="Estado" id="Estado">
    <option value="Activo" name='Activo'>Activo</option>
    <option value="Inactivo" name='inactivo'>Inactivo</option>
  </select>
  <br/>
  <br/>
  <input type="submit" value="Submit"/>
  </form>
    </>
  )
}
