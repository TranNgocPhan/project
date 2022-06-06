export function setCookie(cname, cvalue) {
    document.cookie = cname + '=' + cvalue ;
}
export function getCookie(cname) {
    /*var cookieList = document.cookie.split(';');
    return cookieList.map((obj, index) => {
        if(obj.indexOf(name) !== -1) return obj.slice(name.length + 2);
    }).join('');*/
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
export function removeCookie(cname) {
    document.cookie = cname +'=localhost:3000; expires=Thu, 0 Dec 2015 12:00:00 UTC;';
}