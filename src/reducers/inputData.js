import { assocPath, values, compose, reduce } from 'ramda'

const defaultState = {
    iri: null,
    listIri: null,
    list: null,
    rdf: null,
    components: {},
    iris: null,
}

export default function inputData(state = defaultState, action) {
    switch (action.type) {
        case 'LIST_COMPONENTS_FULFILLED':
            return assocPath(['components'], action.payload, state)
        case 'INPUT_IRI_CHANGED':
            return assocPath(['iri'], action.payload.iri, state)
        case 'INPUT_CHANGED':
            return assocPath(['rdf'], action.payload.input, state)
        case 'LIST_IRI_CHANGED':
            return assocPath(['listIri'], action.payload.iri, state)
        case 'LIST_CHANGED':
            return assocPath(['list'], action.payload.list, state)
        case 'OBTAIN_INPUT_IRIS_FULFILLED':
            return assocPath(['iris'], action.payload.inputIris, state)
        case 'TOGGLE_ITEM':
            const { iri, isActive, componentType } = action
            if (iri !== null) {
                return assocPath(['components', componentType, iri, 'isActive'], isActive, state)
            }

            return compose(
                reduce((acc, item) => assocPath(['components', componentType, item.iri, 'isActive'], isActive, acc), state),
                values,
            )(state.inputData.components[componentType])
        default:
            return state
    }
}