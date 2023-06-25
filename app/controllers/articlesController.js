import dbConnection from "../helpers/fileSystem.js";
import {findAllRequestValidation} from "../request/CategoryRequest.js"
import path from "path"

// Send responses according to search with pagination
export const getAllArticles = async (req, res, next) => {
    // 1. Validate all parameters
    if(findAllRequestValidation(req) !== true) {
        next(findAllRequestValidation(req));
    }
    try {
        // 2. Get all query parameters
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const search = req.query.search || "";
        const sortBy = req.query.sort_by || "updatedAt";
        const sortType = req.query.sort_type || "asc";


        // 3. Retrieve all Categories from the database
        const db = new dbConnection(path.resolve('./app/db/articles.json'))
        let articles = await db.getDB();


        // 4. Generate data based on search & pagination
        // 4.1 : Search
        if(search){
            articles = articles.filter((item) => item.title.toLowerCase().includes(search))
        }
        // 4.2 : sorting
        articles = articles.sort((a,b) => {
            if(sortType == 'asc'){
                return a[sortBy].toString().localeCompare(b[sortBy].toString())
            }else if(sortType == 'desc'){
                return b[sortBy].toString().localeCompare(a[sortBy].toString())
            }
        })  
        // 4.3 : pagination
        let start = page > 1 ? (page - 1) * limit : 0;
        let totalItems = articles.length;
        articles = articles.slice(start,  page * limit)

        // 5. Send responses according to status code
        articles = articles.map((item) => {
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
            data : articles,
            links: {
                self: req.url,
                nextPage: `/articles?page=${page + 1}&limit=${limit}`,
                prevPage: `/articles?page=${page - 1}&limit=${limit}`,
                firstPage: `/articles?page=${1}&limit=${limit}`,
                lastPage: `/articles?page=${Math.ceil(articles.length / limit)}&limit=${limit}`,
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
        res.status(200).json({ ...result});

    } catch (error) {
        next(error)
    }
};


// send single Article data
export const getSingleArticle = (req, res, next) => {
};


// create new Article
export const createArticle = (req, res, next) => {
};

// update exiting Article
// or create new one if Article not found
export const updateOrCreateArticle = (req, res, next) => {
};


// update exiting Article
export const updateArticle = (req, res, next) => {
};


// delete exiting Article along with all commnets and articles
export const deleteArticle = (req, res, next) => {
};
