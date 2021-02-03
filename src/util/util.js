import day from "dayjs";
/**
 * 向根目录中增加css变量，实现主题色的修改
 * @param themes
 */
export function changeThemeColor(themes) {
    document.getElementById('theme').innerHTML = `:root{--bgColor:${themes};}`
}

/**
 * 日期格式化
 * @param date
 * @param format
 * @returns {string}
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
    return day(date).format(format);
}

export function keyBy(list, key, value) {
    let result = {};
    list.forEach(item => {
        if(!result[item[key]]) result[item[key]] = value ? item[value] : item;
    })

    return result
}

export function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn(...args);
        }, delay)
    }
}

export function throttle(fn, delay) {
    let timer = null;
    return function (...args) {
        if (!timer) {
            timer = setTimeout(() => {
                fn(...args);
                clearTimeout(timer);
                timer = null;
            }, delay)
        }
    }
}
