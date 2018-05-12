import { combineReducers } from 'redux'
import apiStatus from './apiStatus'
import appStatus from './appStatus'
import discoveries from './discoveries'
import inputData from './inputData'
import multirunnerStatus from './multirunnerStatus'
import persisted from './persisted'

export default combineReducers({
    apiStatus,
    appStatus,
    discoveries,
    inputData,
    multirunnerStatus,
    persisted,
})