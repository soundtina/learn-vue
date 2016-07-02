
export function checkUsername(username) {
    let isOk = true;
    let errorCode = [];

    if (!username) {
        isOk = false;
        errorCode.push('USERNAME NOT EMPTY');
    }

    return { isOk, errorCode };
}

export function checkPassword(password) {
    let isOk = true;
    let errorCode = [];

    if (!password) {
        isOk = false;
        errorCode.push('PASSWORD NOT EMPTY');
    }

    return { isOk, errorCode };
}
