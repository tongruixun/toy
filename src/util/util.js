import dayjs from "dayjs";


const dayOfYear = require('dayjs/plugin/dayOfYear');
dayjs.extend(dayOfYear)

const weekOfYear = require('dayjs/plugin/weekOfYear');
dayjs.extend(weekOfYear)

// 年周数
const isoWeeksInYear = require('dayjs/plugin/isoWeeksInYear');
const isLeapYear = require('dayjs/plugin/isLeapYear');
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

// dayjs(dayjs().endOf('year')).dayOfYear() 今年有多少天
// dayjs().dayOfYear() 今年第几天
// dayjs().isoWeeksInYear() 今年有多少周
// dayjs().week() 今年第多少周

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
    const moment = dayjs();
    const result = [];
    result[0] = moment.format('YYYY');
    result[1] = moment.format('MM');
    result[2] = moment.format('DD');
    result[3] = moment.format('HH:mm:ss');
    result[4] = week[moment.get('day')];
    return result
}

export function getRemainingDate() {

    const moment = dayjs();
    const countdowns = [
        {
            title: moment.add(1, 'year').format('YYYY 年'),
            startDate: moment,
            endDate: moment.endOf('year')
        },{
            title: moment.add(1, 'month').format('MM 月'),
            startDate: moment,
            endDate: moment.endOf('month')
        },{
            title: '周五',
            startDate: moment,
            endDate: moment.day(5)
        }
    ]

    return countdowns.map(item => getCountdown(item));
}

function getCountdown({title, startDate, endDate}) {
    if(!(startDate instanceof dayjs)) startDate = dayjs(startDate);
    if(!(endDate instanceof dayjs)) startDate = dayjs(endDate);
    const result = {};
    // 日期差异
    result.remainingDaysInYear = endDate.diff(startDate, 'day');
    result.title = title;
    result.endTime = {
        week: week[endDate.get('day')],
        date: endDate.format('YYYY-MM-DD')
    }
    return result;
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
