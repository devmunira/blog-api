import {isPositiveNumber} from "../helpers/helpers.js"

// find all category request validation
export const findAllRequestValidation = (req) => {
    let error = {
        code : 400,
        message : 'Bad Request',
        errors : []
    };
    ['page','limit'].forEach((item) => {
        if(req.query[item] && !isPositiveNumber(+req.query[item])){
            error.errors.push({
                message : `${item} query must be an integer`,
                field : item,
                in : 'query'
            })
        }
    })

    if(req.query.sort_type && !req.query.sort_type.toString().includes('asc') && !req.query.sort_type.toString().includes('desc')){
        error.errors.push({
            message : `Sort type query must be asc or desc`,
            field : 'Sort type',
            in : 'query'
        })
    }

    if(req.query.sort_by && !req.query.sort_by.toString().includes('updatedAt') && !req.query.sort_by.toString().includes('title')
    && !req.query.sort_by.toString().includes('id')){
        error.errors.push({
            message : `Sort by query must be updateAt,title or id`,
            field : 'Sort by',
            in : 'query'
        })
    }


   return error = error.errors.length > 0 ? error : true
}
