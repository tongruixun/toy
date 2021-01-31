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
