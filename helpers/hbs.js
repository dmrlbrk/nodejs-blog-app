import moment from 'moment';


const truncate = (str, len) => {
    return str.length > len ? str.substring(0, len) + ' ...' : str
}
const limit = (arr, limit) => {
    return !Array.isArray(arr) ? [] : arr.slice(0, limit)
}
const dateFormat = (date, format) => {
    return moment(date).format(format)
}
const isSelected = (postCategoryId, categoryId) => {
    return String(postCategoryId) == String(categoryId) ? "selected" : null
}

export { truncate, limit, dateFormat, isSelected }