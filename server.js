const express = require('express')
const app = express()
const middlewares = require('./middleware/index')
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocs = YAML.load('./swagger.yaml')
const dotenv = require('dotenv').config()
const UserRouter = require('./route/userRoute')
const ArticleRouter = require('./route/articlesRoute')
const CommentRouter = require('./route/commentsRoute')
const CategoryRouter = require('./route/categoryRoute')
const AuthRouter = require('./route/authenticationRoute')

//env veriables load from .env file
const PORT = process.env.LOCAL_SERVER_PORT || 5000


// express middlewares
app.use(middlewares)
//swagger API UI load on server
app.use('/docs' , swaggerUI.serve , swaggerUI.setup(swaggerDocs))
//check API Health
app.get('/health',(_req,res) => res.status(200).json({message : 'API Health is okay'}))
//add all routes
app.use('/api/v1/users' , UserRouter)
app.use('/api/v1/articles' , ArticleRouter)
app.use('/api/v1/comments' , CommentRouter)
app.use('/api/v1/categories' , CategoryRouter)
app.use('/api/v1/auth' , AuthRouter)



// server  running for server
app.listen(PORT , () => {
    console.log(`SERVER IS LISTENING ON ${PORT}`)
})