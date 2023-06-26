import Article from "../models/Article.js"

export const filterArtilces = async (search,sortType,sortBy,page,limit,url) => {
    // 1. Retrieve all Categories from the database
    let articles = await Article.init()

    // 2. Generate data based on search & pagination
    // 2.1 : Search
    articles = Article.search(search)

    // 2.2 : sorting
    articles = Article.sort(sortType,sortBy)

    // 2.3 : pagination
    let {totalItems, articles : articlesItem } = Article.pagination(page,limit) 
    articles = articlesItem

    // 5. Send responses according to status code
    let result =  Article.transformedArticles(page,limit,totalItems,url)

    if(page <= 1) {
        delete result.pagination.prev
        delete result.links.prevPage
        delete result.links.firstPage
    }
    if(page >= Math.ceil(totalItems / limit)){
        delete result.pagination.next
        delete result.links.nextPage
        delete result.links.lastPage
    }

    return result
}