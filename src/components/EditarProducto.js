import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { editarProducto } from '../actions/productoActions'

const EditarProducto = () => {

    //redux
    const dispatch = useDispatch()

    //State local
    const [producto, setProducto] = useState({
        nombre: '',
        precio: 0
    })

    const navigate = useNavigate()

    // Producto editar
    const productoEditar = useSelector( state => state.productos.productoEditar )

    useEffect( () => {
        setProducto(productoEditar)
    }, [productoEditar])

    //Leer los datos del formulario
    const onChangeFormulario = e => {
        setProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    const {nombre, precio, id} = producto

    const handleSubmit = e => {
        e.preventDefault()

        dispatch( editarProducto(producto) )
        navigate('/')
    }

  return (
    <div className='row justify-content-center'>
      <div className='col-md-8'>
          <div className='card'>
              <div className='card-body'>
                  <h2 className='text-center mb-4 font-weight-bold'>
                      Editar Producto
                  </h2>

                  <form
                    onSubmit={handleSubmit}
                  >
                      <div className='form-group'>
                          <label>Nombre Producto</label>
                          <input 
                                type="text"
                                className='form-control'
                                placeholder="Nombre Producto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeFormulario}
                            />
                      </div>
                      <div className='form-group'>
                          <label>Precio Producto</label>
                          <input 
                                type="number"
                                className='form-control'
                                placeholder="Precio Producto"
                                name="precio"
                                value={precio}
                                onChange={onChangeFormulario}
                            />
                      </div>
                      <button
                        type="submit"
                        className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>
                            Guardar Cambios
                        </button>
                  </form>
              </div>
          </div>
      </div>
    </div>
  )
}

export default EditarProducto
