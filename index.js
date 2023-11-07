import pgPromise from "pg-promise";
import shoe_service from "./service/shoe_service.js";
import shoe_api from "./api/shoe.js";
import cors from "cors"
import express from "express";


const pgp = pgPromise();

//SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

// Database connection
const connectionString = process.env.DATABASE_URL || "postgres://otzyymfe:0lGTbqnyGfXApYOVD2IceTfouyXP0oxi@silly.db.elephantsql.com/otzyymfe?ssl=true";
const database = pgp(connectionString);

//database instance
const shoe_service_instance = shoe_service(database);

//api instance
const api = shoe_api(shoe_service_instance)

//expressJS instance
const app = express();

//middleware configuration
app.use(express.json());
app.use(cors());


//API routes
app.get('/', api.api);
app.get('/api/shoes', api.all_shoes);
app.get('/api/shoes/brand/:brandname',api.shoes_by_brand);
app.get('/api/shoes/size/:size',api.shoes_by_size);
app.get('/api/shoes/brand/:brandname/size/:size',api.shoes_by_brand_and_size);
app.post('/api/shoes/sold/:id', api.sold_shoes);
app.post('/api/shoes/add', api.insert);


// Start the server
const PORT = process.env.PORT || 3007;
app.listen(PORT, function () {
    console.log("App started at port:", PORT);
});