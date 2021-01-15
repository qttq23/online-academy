// wrapper for API calls

import myRequest from "./myRequest";
import myConfig from './myConfig';


function checkCredential(credential, okCallback, failCallback) {


    myRequest({
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/auth/login`,
            data: {
                'email': credential.email,
                'password': credential.password
            }
        },
        okCallback,
        failCallback
    )


}

function getAccountInfo(accountId, okCallback, failCallback) {
    myRequest({
            method: 'get',
            url: `${myConfig.apiServerAddress}/api/accounts/${accountId}`,
        },
        okCallback,
        failCallback
    )
}

function registerAccount(account, accessToken, okCallback, failCallback) {

    // add some default values for student account
    account.loginType = 0
    if (!account.type) {
        account.type = 2

    }

    myRequest({
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/auth/register`,
            data: {
                'name': account.name,
                'email': account.email,
                'password': account.password,
                'type': account.type,
                'loginType': account.loginType
            },
            headers: {
                'x-access-token': accessToken
            }
        },
        okCallback,
        failCallback
    )
}

function activateAccount({ email, activeCode }, okCallback, failCallback) {
    myRequest({
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/auth/active`,
            data: { email, activeCode }
        },
        okCallback,
        failCallback
    )
}

function updateAccountInfo(accessToken, accountId, updateData, okCallback, failCallback) {
    myRequest({
            method: 'patch',
            url: `${myConfig.apiServerAddress}/api/accounts/${accountId}`,
            data: updateData,
            headers: {
                'x-access-token': accessToken
            }
        },
        okCallback,
        failCallback
    )
}

function refreshAccessToken({ accessToken, refreshToken }, okCallback, failCallback) {

    myRequest({
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/auth/refreshToken`,
            data: { accessToken, refreshToken },

        },
        okCallback,
        failCallback
    )
}


function getCategoryList(okCallback, failCallback) {
    myRequest({
            method: 'get',
            url: `${myConfig.apiServerAddress}/api/categories`,
        },
        okCallback,
        failCallback
    )
}

function createCourse(accessToken, course, okCallback, failCallback) {

    myRequest({
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/courses`,
            data: course,
            headers: {
                'x-access-token': accessToken
            }
        },
        okCallback,
        failCallback
    )

}

function getStorageToken(accessToken, okCallback, failCallback) {

    myRequest({
            method: 'get',
            url: `${myConfig.apiServerAddress}/api/custom/storage/token`,
            headers: {
                'x-access-token': accessToken
            }
        },
        okCallback,
        failCallback
    )

}

function updateCourse(accessToken, courseId, updateData, okCallback, failCallback) {

    myRequest({
            method: 'patch',
            url: `${myConfig.apiServerAddress}/api/courses/${courseId}`,
            data: updateData,
            headers: {
                'x-access-token': accessToken
            }
        },
        okCallback,
        failCallback
    )

}

function createChapter(accessToken, chapter, okCallback, failCallback) {
    myRequest({
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/chapters`,
            data: chapter,
            headers: {
                'x-access-token': accessToken
            }
        },
        okCallback,
        failCallback
    )
}

function createVideo(accessToken, video, okCallback, failCallback) {
    myRequest({
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/videos`,
            data: video,
            headers: {
                'x-access-token': accessToken
            }
        },
        okCallback,
        failCallback
    )
}

function updateVideo(accessToken, videoId, updateData, okCallback, failCallback) {
    myRequest({
            method: 'patch',
            url: `${myConfig.apiServerAddress}/api/videos/${videoId}`,
            data: updateData,
            headers: {
                'x-access-token': accessToken
            }
        },
        okCallback,
        failCallback
    )
}


export default {
    checkCredential,
    getAccountInfo,
    registerAccount,
    activateAccount,
    updateAccountInfo,
    refreshAccessToken,
    getCategoryList,
    createCourse,
    getStorageToken,
    updateCourse,
    createChapter,
    createVideo,
    updateVideo,
}