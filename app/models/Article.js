import dbConnection from "../helpers/fileSystem.js";
import path from "path"

class Article {

    constructor() {
        this.articles = []
    }

    async init() {
        const db = new dbConnection(path.resolve('./app/db/articles.json'))
        this.articles = await db.getDB();
        return this.articles
    }

    search(search) {
        if (search) {
            this.articles = this
                .articles
                .filter((item) => item.title.toLowerCase().includes(search))
        }
        return this.articles
    }

    sort(sortType , sortBy) {
       this.articles =  this.articles.sort((a, b) => {
            if (sortType == 'asc') {
                return a[sortBy]
                    .toString()
                    .localeCompare(b[sortBy].toString())
            } else if (sortType == 'desc') {
                return b[sortBy]
                    .toString()
                    .localeCompare(a[sortBy].toString())
            }
        })

        return this.articles
    }

    pagination(page,limit) {
        let start = page > 1 ? (page - 1) * limit : 0;
        let totalItems = this.articles.length;
        this.articles = this.articles.slice(start,  page * limit)
        return {
            totalItems,
            articles : this.articles
        }
    }

    transformedArticles(page,limit,totalItems,url) {
        this.articles = this.articles.map((item) => {
            let obj = {...item}
            obj.author = {
                id : item.authorId,
                //TODO: Fetch author name
                name : 'test'
            }
            obj.category = {
                id : item.categoryId,
                //TODO: Fetch category name
                name : 'test'
            }
            delete obj.authorId
            delete obj.categoryId
            return obj;
        })


         let result = {
            code : 200,
            message : "Successfully fetch all articles from db",
            data : this.articles,
            links: {
                self: '/articles'+url,
                nextPage: `/articles?page=${page + 1}&limit=${limit}`,
                prevPage: `/articles?page=${page - 1}&limit=${limit}`,
                firstPage: `/articles?page=${1}&limit=${limit}`,
                lastPage: `/articles?page=${Math.ceil(this.articles.length / limit)}&limit=${limit}`,
            },
            pagination: {
            page,
            limit,
            next: page + 1,
            prev: page - 1,
            totalPage: Math.ceil(totalItems / limit),
            totalItems
            }
        }

        return result
    }
}

export default Article = new Article();