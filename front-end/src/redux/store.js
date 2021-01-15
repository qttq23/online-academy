import { createStore } from 'redux';


const initState = {
    mostRegisteredCourses: [],
    mostViewedCourses: [],
    newestCourses: [],
    mostRegisteredCategories: [],

    detailedCourse: null,
    feedbacks: [],
    relatedCourses: [],
    account: null,
    emailNeedValidate: null,
    chapters: [],
    video: null,
    categories: [],
    registeredList: [],
    watchList: [],
    teachList: [],
}


const reducer = function(state, { type, payload }) {
    switch (type) {
        case 'set_mostViewedCourses':
            console.log('store.js: set_mostViewedCourses: ', payload)
            return {
                ...state,
                mostViewedCourses: [...payload.data]
            }
        case 'set_newestCourses':
            console.log('store.js: set_newestCourses: ', payload)
            return {
                ...state,
                newestCourses: [...payload.data]
            }
        case 'set_mostRegisteredCourses':
            console.log('store.js: set_mostRegisteredCourses: ', payload)
            return {
                ...state,
                mostRegisteredCourses: [...payload.data]
            }
        case 'set_mostRegisteredCategories':
            console.log('store.js: set_mostRegisteredCategories: ', payload)
            return {
                ...state,
                mostRegisteredCategories: [...payload.data]
            }

        case 'set_detailedCourse':
            console.log('store.js: set_detailedCourse: ', payload)
            return {
                ...state,
                detailedCourse: { ...payload.data }
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
        case 'set_account':
            console.log('store.js: set_account: ', payload)

            if (!payload.data) {
                return {
                    ...state,
                    account: null
                }
            }

            return {
                ...state,
                account: { ...payload.data }
            }
        case 'set_chapters':
            console.log('store.js: set_chapters: ', payload)
            return {
                ...state,
                chapters: [...payload.data]
            }

        case 'set_emailNeedValidate':
            console.log('store.js: set_emailNeedValidate: ', payload)
            return {
                ...state,
                emailNeedValidate: payload.data
            }
        case 'set_video':
            console.log('store.js: set_video: ', payload)
            return {
                ...state,
                video: { ...payload.data }
            }
        case 'set_categories':
            console.log('store.js: set_categories: ', payload)
            return {
                ...state,
                categories: [...payload.data]
            }
        case 'set_registeredList':
            console.log('store.js: set_registeredList: ', payload)
            return {
                ...state,
                registeredList: [...payload.data]
            }
        case 'set_watchList':
            console.log('store.js: set_watchList: ', payload)
            return {
                ...state,
                watchList: [...payload.data]
            }
        case 'set_teachList':
            console.log('store.js: set_teachList: ', payload)
            return {
                ...state,
                teachList: [...payload.data]
            }    

        default:
            return state;
    }
}

const store = createStore(reducer, initState)

export default store