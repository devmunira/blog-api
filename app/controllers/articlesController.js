import findAllRequestValidation from "../request/CategoryRequest.js"

// Send responses according to search with pagination
export const getAllArticles = (req, res, next) => {
    // 1. Validate all parameters
    if (findAllRequestValidation(req) !== true) {
        next(findAllRequestValidation(req));
    }
    // 2. Get all query parameters
    const page = +req.query.page ?? 1;
    const limit = +req.query.limit ?? 10;
    const search = req.query.search ?? "";
    const sortBy = req.query.sort_by ?? "updatedAt";
    const sortType = req.query.sort_type ?? "asc";
    // 3. Retrieve all Categories from the database
    // 4. Generate data based on search & pagination
    // 5. Send responses according to status code
    res.status(200).json({ message: "Success" });
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
