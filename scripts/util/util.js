function keyBy(list, key, value) {
    let result = {};
    list.forEach(item => {
        if(!result[item[key]]) result[item[key]] = value ? item[value] : item;
    })

    return result
}


module.exports.keyBy = keyBy;