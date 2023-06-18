

export default (str, len) => {
    console.log(str, len)
    return str.length > len ? str.substring(0, len) + ' ...' : str

}