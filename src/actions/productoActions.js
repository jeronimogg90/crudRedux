import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_ERROR,
    AGREGAR_PRODUCTO_EXITO,
    COMENZAR_DESCARGA_PRODUCTOS,
    DESCARGA_PRODUCTOS_EXITO,
    DESCARGA_PRODUCTOS_ERROR,
    OBTENER_PRODUCTO_ELIMINAR,
    PRODUCTO_ELIMINAR_EXITO,
    PRODUCTO_ELIMINAR_ERROR,
    OBTENER_PRODUCTO_EDITAR,
    COMENZAR_EDICION_PRODUCTO,
    PRODUCTO_EDITADO_EXITO,
    PRODUCTO_EDITADO_ERROR
} from '../types'

import clienteAxios from '../config/axios'
import Swal from 'sweetalert2'

// Crear nuevos productos
export function crearNuevoProductoAction(producto) {
    return async (dispatch) => {
        dispatch( agregarProducto() )

        try{
            // insertamos en la API
            await clienteAxios.post('/productos', producto)

            // si todo sale bien actualizar el state
            dispatch( agregarProductoExito(producto) )

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            )
        } catch (error){
            console.error(error)
            // si hay un error cambiar el satte
            dispatch( agregarProductoError(true) )

            // Alerta del error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error al agregar productos'
            })
        }
    }
}

const agregarProducto = () => ({
    type : AGREGAR_PRODUCTO,
    payload: true
})

// Si el producto se guarda en base de datos
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

// si hubo algun error
const agregarProductoError = error => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: error
})

//Funcion que descarga los productos de base de datos
export function obtenerProductosAction () {
    return async (dispatch) => {
        dispatch( descargaProductos ())

        try{
            const respuesta = await clienteAxios.get('/productos')
            dispatch ( descargaProductosExitosa(respuesta.data) )
        } catch(error){
            console.error(error)
            dispatch ( descargaProductosError() )
        }
    }
}

const descargaProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos,
})

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
})

// Selecciona y elimina el producto
export function borrarProductoAction(id){
    return async dispatch => {
        dispatch( obtenerProductoEliminar(id))

        try{
            await clienteAxios.delete(`/productos/${id}`)
            dispatch( productoEliminarExito() )

            // Si se elimina mostrar alerta
            Swal.fire(
                'Eliminado!',
                'El producto ha sido elimnado.',
                'success'
              )
        } catch (error){
            dispatch( productoEliminarError() )
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload : id
})

const productoEliminarExito = () => ({
    type: PRODUCTO_ELIMINAR_EXITO
})

const productoEliminarError = () => ({
    type: PRODUCTO_ELIMINAR_ERROR,
    payload: true
})

// Colocar producto en edicion
export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch(obtenerProductoEditarAction(producto))
    }
} 

const obtenerProductoEditarAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
})

// Edita un producto en la API y state

export function editarProducto(producto) {
    return async (dispatch) => {
        dispatch( editarProductoAction(producto))

        try{
            await clienteAxios.put(`/productos/${producto.id}`, producto)
            dispatch( editarProductoExito(producto))
        } catch (error){
            console.error(error)
            dispatch( editarProductoError() )
        }
    }
}

const editarProductoAction = producto => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: producto
})

const editarProductoExito = producto => ({
    type : PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const editarProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR,
    payload: true
})