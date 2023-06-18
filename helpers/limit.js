
export default (arr, limit) => {
    // console.log(arr, limit)
    return !Array.isArray(arr) ? [] : arr.slice(0, limit)

}