/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:10:06 
 * @Last Modified by: jiaze
 * @Last Modified time: 2019-09-15 22:50:20
 */

import {
    userLogin
} from '@/api/login';
import {
    SAVE_TOKEN
} from '@/store/type';
import Cookie from 'js-cookie';

export default {
    namespace: 'login',
    state: {
        token: Cookie.get('token') || '',
        name:sessionStorage.getItem('name')||''
    },
    effects: {
        * login({
            payload
        }, {
            call,
            put
        }) {
            const result = yield call(userLogin, payload);
            Cookie.set('token', result.data.token, {
                expires: 7
            });
            Cookie.set('id', result.data.id, {
                expires: 7
            });
            Cookie.set('identity_id', result.data.identity_id, {
                expires: 7
            });
            Cookie.set('username', result.data.username, {
                expires: 7
            });
            yield put({
                type: SAVE_TOKEN,
                payload: {
                    token: result.data.token,
                    value: result,
                    name:payload.username
                     
                }
            });
        },
        * upHeadImg({
            payload
        }, {
            call,
            put
        }) {
            localStorage.setItem("HeadImg", payload)
            yield put({
                type: 'SAVE_HEADIMG',
                value: payload
            });
        }
    },
    reducers: {
        [SAVE_TOKEN](state, {
            payload
        }) 
    
        {
            console.log(payload)
            return {
                ...state,
                ...payload,
                name:payload.name
                
            };
        },
        SAVE_HEADIMG(state, {
            value
        }) {
            return {
                ...state,
                headImg: value
            }
        }
    }
};