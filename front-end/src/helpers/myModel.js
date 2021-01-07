

// wrapper for API calls

import myRequest from "./myRequest";
import myConfig from './myConfig';


function checkCredential(credential, okCallback, failCallback){


     myRequest(
            {
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

function getAccountInfo(accountId, okCallback, failCallback){
    myRequest(
        {
            method: 'get',
            url: `${myConfig.apiServerAddress}/api/accounts/${accountId}`,
        },
        okCallback,
        failCallback
    )
}

function registerAccount(account, okCallback, failCallback){

    // add some default values for student account
    account.type = 2
    account.loginType = 0

    myRequest(
        {
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/auth/register`,
            data: {
                'name': account.name,
                'email': account.email,
                'password': account.password,
                'type': account.type,
                'loginType': account.loginType
            }
        },
        okCallback,
        failCallback
    )
}

function activateAccount({email, activeCode}, okCallback, failCallback) {
    myRequest(
        {
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/auth/active`,
            data: { email, activeCode }
        },
        okCallback,
        failCallback
    )
}

function updateAccountInfo(accessToken, accountId, updateData, okCallback, failCallback){
    myRequest(
        {
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

function refreshAccessToken({accessToken, refreshToken}, okCallback, failCallback ){

    myRequest(
        {
            method: 'post',
            url: `${myConfig.apiServerAddress}/api/auth/refreshToken`,
            data: { accessToken, refreshToken },

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


}



