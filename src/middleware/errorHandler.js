import { endsWith } from 'ramda'

export default function createErrorHandler() {
    return store => next => action => {
        try {
            if (endsWith('_REJECTED', action.type))
            {
                if (action.payload && action.error && action.payload.message)
                {
                    // Thanks, fetch (throws TypeError as payload directly); e.g. CORS.
                    store.dispatch({ type: 'API_ERROR', payload: { error: action.payload } })
                }
                else
                {
                    store.dispatch({ type: 'API_ERROR', payload: action.payload })
                }
                store.dispatch({ type: 'APP_DATA_LOADING_FINISHED' })
            }
            else if (action.payload && action.payload.error && !endsWith('_ERROR', action.type)) 
            {
                store.dispatch({ type: 'APP_ERROR', payload: action.payload })
                store.dispatch({ type: 'APP_DATA_LOADING_FINISHED' })
                // Not sure I want to stop here, but I think I want to. At least for now.
                return;
            }
            else if (endsWith('_PENDING', action.type))
            {
                store.dispatch({ type: 'APP_DATA_LOADING_STARTED' })
                store.dispatch({ type: 'APP_RECOVERED' })
                store.dispatch({ type: 'API_RECOVERED' })
            }
            else if (endsWith('_FULFILLED', action.type))
            {
                store.dispatch({ type: 'APP_DATA_LOADING_FINISHED' })
            }
            return next(action);
        } catch (e) {
            console.log("!!!!", e);
        }
    };
}