import { createStore } from 'redux';


const initState = {
    mostViewedCourses: [
    ],
    detailedCourse: null,
    feedbacks: [],
    relatedCourses: [],
    account: null,
    emailNeedValidate: null,
    chapters: [],
    video: null
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
        case 'set_account':
            console.log('store.js: set_account: ', payload)

            if(!payload.data){
                return {
                    ...state,
                    account: null
                }
            }

            return {
                ...state,
                account: {...payload.data}
            }
        case 'set_chapters':
            console.log('store.js: set_chapters: ', payload)
            return {
                ...state,
                chapters: [...payload.data]
            }

        // case 'update_account': // payload: {name: 'ssdf'}
        //     console.log('store.js: update_account: ', payload)
        //     return {
        //         ...state,
        //         account: { ...state.account, ...payload.data }
        //     }
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
                video: {...payload.data}
            }


        default:
            return state;
    }
}

const store = createStore(reducer, initState)

export default store