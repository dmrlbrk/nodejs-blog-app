
export default (postCategoryId, categoryId) => {
    if (String(postCategoryId) == String(categoryId)){
        return "selected"
    }
    else{
        return null
    }
}