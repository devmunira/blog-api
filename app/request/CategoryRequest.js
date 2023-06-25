import isPositiveNumber from "../helpers/helpers.js"

// find all category request validation
const findAllRequestValidation = (req) => {
    let error = {
        code : 400,
        message : 'Bad Request',
        errors : []
    };
    ['page','limit'].forEach((item) => {
        if(!isPositiveNumber(+req.query[item])){
            error.errors.push({
                message : `${item} query must be an integer`,
                field : item,
                in : 'query'
            })
        }
    })

    if(req.query.sort_type !== 'ase' || req.query.sort_type !== 'desc'){
        error.errors.push({
            message : `Sort type query must be asc or desc`,
            field : 'Sort type',
            in : 'query'
        })
    }

   return error = error.errors.length > 0 ? error : true
}

export default {
    findAllRequestValidation,
}