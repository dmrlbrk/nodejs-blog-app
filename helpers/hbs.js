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
const paginate = (options) => {
    // console.log(options)
    let outputHTML = ''
    let current = Number(options.hash.current)
    let pages = Number(options.hash.pages)
    console.log(current)
    if (current === 1) {
        outputHTML += `<li class="page-item disabled"><a class="page-link" href="?page=${1}"> First </a></li>`
    }
    else {
        outputHTML += `<li class="page-item"><a class="page-link" href="?page=1">First</a></li>`
    }

    let i = Number(current) > 3 ? Number(current) - 3 : 1

    if (i !== 1) {
        outputHTML += `<li class="page-item disabled"><a class="page-link"> ... </a></li>`
    }
    
    for (; i <= (Number(current) + 3) && i <= pages; i++) {
        if (i === current) {
            outputHTML += `<li class="page-item active"><a class="page-link" href="?page=1"> ${i} </a></li>`
        }
        else {
            outputHTML += `<li class="page-item"><a class="page-link" href="?page=${i}"> ${i} </a></li>`
        }
        if (i === current + 3 && i < pages) {
            outputHTML += `<li class="page-item disabled"><a class="page-link" href="?page=${i}"> ... </a></li>`
        }
    }



    if (current === pages) {
        outputHTML += `<li class="page-item disabled"><a class="page-link" > Last </a></li>`
    }
    else {
        outputHTML += `<li class="page-item"><a class="page-link" href="?page=${pages}"> Last </a></li>`
    }
    return outputHTML
}

export { truncate, limit, dateFormat, isSelected, paginate }