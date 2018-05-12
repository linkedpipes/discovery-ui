import { createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'remote-redux-devtools'
import reducer from '../reducers/index'
import createErrorHandler from '../middleware/errorHandler'

export default function initStore() {
    return createStore(
        reducer,
        applyMiddleware(
            thunkMiddleware,
            promiseMiddleware(),
            createLogger({ collapsed: true }),
            createErrorHandler(),
        )
    )
}
