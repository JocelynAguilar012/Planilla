import React from 'react'

export const Amount = () => {
  return (
    <>
    <h2>Amount</h2>
  <form>
    <p>Company: Object ID</p>
  <label for="Tipo">Tipo: </label>
    <select name="Tipo" id="Tipo">
    <option value="Personal">Personal</option>
    <option value="Empresa">Empresa</option>
  </select>
  <br/>
  <br/>
  <label for="TipoAplic">Tipo Aplicacion: </label>
    <select name="TipoAplic" id="TipoAplic">
    <option value="Suma">Suma</option>
    <option value="Resta">Resta</option>
  </select>
  <br/>
  <br/>
  <label>Nombre: </label>
  <input></input>
  <br/>
  <br/>
  <label for="Estado">Estado: </label>
    <select name="Estado" id="Estado">
    <option value="Activo">Activo</option>
    <option value="Inactivo">Inactivo</option>
  </select>
  <br/>
  <br/>
  <input type="submit" value="Submit"/>
  </form>
    </>
  )
}
