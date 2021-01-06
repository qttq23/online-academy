import { createStore } from 'redux';


const initState = {
    mostViewedCourses: [
    ],
    detailedCourse: null,
    feedbacks: [],
    relatedCourses: []
}


const reducer = function (state, { type, payload }) {
    switch (type) {
        case 'set_mostViewedCourses':
            console.log('store.js: set_mostViewedCourses: ', payload)
            return {
                ...state,
                mostViewedCourses: [...payload.data]
            }
        case 'set_detailedCourse':
            console.log('store.js: set_detailedCourse: ', payload)
            return {
                ...state,
                detailedCourse: { ...payload.data}
            }
        case 'set_feedbacks':
            console.log('store.js: set_feedbacks: ', payload)
            return {
                ...state,
                feedbacks: [...payload.data]
            }
        case 'set_relatedCourses':
            console.log('store.js: set_relatedCourses: ', payload)
            return {
                ...state,
                relatedCourses: [...payload.data]
            }


        default:
            return state;
    }
}

const store = createStore(reducer, initState)

export default store