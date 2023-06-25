import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

//all middlewares setup
let middlewares = [express.json(), express.urlencoded({extended : true}) , morgan('dev') , cors()]

//export for external use
export default middlewares



