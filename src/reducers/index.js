import { combineReducers } from 'redux'
import productosReducer from './productosReducer'
import alertaRedurer from './alertaRedurer'

export default combineReducers({
    productos: productosReducer,
    alerta: alertaRedurer
})