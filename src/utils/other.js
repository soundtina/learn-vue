import _ from 'lodash';


/**
 * 设置 cookie
 * @param {[type]} name   [description]
 * @param {[type]} value  [description]
 * @param {[type]} _times 默认十分钟；如需清楚该 cookie，则传入负值
 */
export function setCookie(name, value, _times) {
    const times = _times || (1000 * 60 * 10);
    let date = new Date();
    date.setTime(date.getTime() + times);

    let newCookies = '';
    if (_.isString(name)) {
        newCookies = `${name}=${value}; `;
    } else if (_.isObject(name)) {
        for (const key in name) {if (name.hasOwnProperty(key)) {
            newCookies += `${key}=${name[key]}; `;
        }}
    }

    document.cookie = `${newCookies}expires=${date.toGMTString()}`;
}

/**
 * 获取所有的 cookie
 * @return {[type]} [description]
 */
export function getCookieAll() {
    const cookieArr = document.cookie.split('; ');

    let cookieObj = {};
    for (let i = 0; i < cookieArr.length; i++) {
        const [k, v] = cookieArr[i].split('=');
        cookieObj[k] = v;
    }

    return cookieObj;
}

export function getCookieByName(name) {
    const cookieArr = document.cookie.split('; ');

    for (let i = 0; i < cookieArr.length; i++) {
        const [k, v] = cookieArr[i].split('=');
        if (k === name) {
            return v;
        }
    }

    return '';
}
