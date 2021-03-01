import dayjs from "dayjs";


const dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(dayOfYear)

// 年周数
const isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear');
const isLeapYear = require('dayjs/plugin/isLeapYear');
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

// dayjs(dayjs().endOf('year')).dayOfYear() 今年有多少天
// dayjs().dayOfYear() 今年第几天
// dayjs().isoWeeksInYear() 今年有多少周

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
    return dayjs(date).format(format);
}

const week = ['星期天','星期一','星期二','星期三','星期四','星期五','星期六',]

/**
 *
 * @returns {[]} [year,month,date,hours:minute:second,day]
 */
export function renderTime() {
    const time = dayjs();
    const currentTime = [];
    currentTime[0] = time.format('YYYY');
    currentTime[1] = time.format('MM');
    currentTime[2] = time.format('DD');
    currentTime[3] = time.format('HH:mm:ss');
    currentTime[4] = week[time.get('day')];
    return currentTime
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
