// create the connection code to mongodb database:

import  { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// Check the MongoDB_URI
if(!MONGODB_URI) {
    throw new Error('Invalid MONGODB_URI');
}

if(!MONGODB_DB) {
    throw new Error('Invalid DataBase');
}

let cacheClient = null;
let cachedDB = null;

export async function connectToDatabase(){
    // check the cached.
    if(cacheClient && cachedDB) {
        // load from cache
        return {
            client: cacheClient,
            db: cachedDB
        }
    }
    // set the connection options
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cacheClient = client;
    cachedDB = db;

    return {
        client: cacheClient,
        db: cachedDB
    }
}