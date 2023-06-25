import express from 'express';
import middlewares from './app/middleware/index.js';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import userRouter from './app/route/userRoute.js';
import commentRouter from './app/route/commentsRoute.js';
import categoryRouter from './app/route/categoryRoute.js';
import authRouter from './app/route/authenticationRoute.js';
import {notFoundHandellar , globalErrorHandellar} from './app/middleware/errorHandler.js';
import articleRouter from './app/route/articlesRoute.js';
const swaggerDocs  = YAML.load('./swagger.yaml')
dotenv.config();
const app = express();


//env veriables load from .env file
const PORT = process.env.LOCAL_SERVER_PORT || 5000


// express middlewares
app.use(middlewares)
//swagger API UI load on server
app.use('/docs' , swaggerUI.serve , swaggerUI.setup(swaggerDocs))
//check API Health
app.get('/health',(_req,res) => res.status(200).json({message : 'API Health is okay'}))
//add all routes
app.use('/api/v1/users' , userRouter)
app.use('/api/v1/articles' , articleRouter)
app.use('/api/v1/comments' , commentRouter)
app.use('/api/v1/categories' , categoryRouter)
app.use('/api/v1/auth' , authRouter)

// handle Global Error
app.use([notFoundHandellar , globalErrorHandellar])

// server  running for port 4000
app.listen(PORT , () => {
    console.log(`SERVER IS LISTENING ON ${PORT}`)
})