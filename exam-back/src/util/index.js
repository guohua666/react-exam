/*
 * @Author: jiaze 
 * @Date: 2019-09-03 15:10:53 
 * @Last Modified by:   jiaze 
 * @Last Modified time: 2019-09-03 15:10:53 
 */

export function getSession(key) {
    return window.sessionStorage.getItem(key);
}
export function setSession(key, val) {
    window.sessionStorage.setItem(key, val);
}
