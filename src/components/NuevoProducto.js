import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions'
import { mostrarAlerta, ocultarAlerta } from '../actions/alertaActions'

// Acceder a estados del redux
import { useDispatch, useSelector } from 'react-redux'


const NuevoProducto = ({history}) => {
    //States locales del componentes
    const [nombre, setNombre] = useState('')
    const [precio, setPrecio] = useState(0)

    //Navegacion por el router
    const navigate = useNavigate()

    // Utilizar useDispatch y te devuelve una fucion

    const disPatch = useDispatch()

    // Acceder al state del store
    const cargando = useSelector( state => state.productos.loading)
    const error = useSelector( state => state.productos.error)
    const alerta = useSelector( state => state.alerta.alerta)

    // Mandar llamar el actions de productoActions
    const agregarProducto = producto => disPatch ( crearNuevoProductoAction(producto) )

    //Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault()

        // Validar Formulario
        if(nombre.trim() === '' || precio <= 0){

            const alerta = {
                msg: 'Ambos campos son obligatorios',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            
            disPatch(mostrarAlerta(alerta))

            return 
        }

        // Si no hay Errores
        disPatch( ocultarAlerta() )

        // Crear el producto
        agregarProducto({nombre, precio})

        // Se redirecciona al componente principal
        navigate('/')
    }
  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
          <div className='card'>
              <div className='card-body'>
                  <h2 className='text-center mb-4 font-weight-bold'>
                      Agregar Nuevo Producto
                  </h2>

                  {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}

                  <form
                        onSubmit={submitNuevoProducto}
                    >
                      <div className='form-group'>
                          <label>Nombre Producto</label>
                          <input 
                                type="text"
                                className='form-control'
                                placeholder="Nombre Producto"
                                name="nombre"
                                value = {nombre}
                                onChange = {e => setNombre(e.target.value)}
                            />
                      </div>
                      <div className='form-group'>
                          <label>Precio Producto</label>
                          <input 
                                type="number"
                                className='form-control'label
                                placeholder="Precio Producto"
                                name="precio"
                                value = {precio}
                                onChange = {e => setPrecio(Number(e.target.value))}
                            />
                      </div>
                      <button
                        type="submit"
                        className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                            Agregar
                        </button>
                  </form>
                  {cargando ? <p>Cargando ... </p> : null}
                  {error ? <p className='alert alert-danger p2 mt-4 text-center'>Ocurrio un error</p> : null}
              </div>
          </div>
      </div>
    </div>
  )
}

export default NuevoProducto
