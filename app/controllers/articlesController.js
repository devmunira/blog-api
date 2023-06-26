import dbConnection from "../helpers/fileSystem.js";
import Article from "../models/Article.js";
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
        let articles = await Article.init()

        // 4. Generate data based on search & pagination
        // 4.1 : Search
        articles = Article.search(search)

        // 4.2 : sorting
        articles = Article.sort(sortType,sortBy)

        // 4.3 : pagination
        let {totalItems, articles : articlesItem } = Article.pagination(page,limit) 
        articles = articlesItem

        // 5. Send responses according to status code
        let result =  Article.transformedArticles(page,limit,totalItems,req.url)

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
