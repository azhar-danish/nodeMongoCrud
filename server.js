require('dotenv').config();
const mongoConnect = require('./database/db');
// const cache = require('./cache/redis');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const app = express();

mongoConnect();

//cache
// global.cache = cache;

//middleware
app.use(cors({origin:"http://localhost:8081"}));
app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:false}));

app.use(helmet());  // automatically applies security-related headers
//helmet appliest default security headers like X-Frame-Options,Strict-Transport-Security,content-security-policy and more..
//prevents from clickjacking

//rate limiting=>to prevent brute force and DDOS attack by limiting the number of request from a single IP.
//brute force attack is a method used by attacker to try all the possible combination of password in order to get an authorized access to the sytemx

// express-rate-limit
const limiter = rateLimit({
    windowMs : 0.25 * 60 * 1000,//30sec (time window for rate limitin)
    max : 4, // allows upto 4 request per IP within the time window
    message : 'Too many requests.Please try again later'//message is sent when rate limit is exceeded
})
//apply rate limit to all the request
app.use(limiter);

//routing
const CustomerRoutes = require('./routes/customerRoutes');
const ProductRoutes = require('./routes/productRoutes');
const OrderRoutes = require('./routes/orderRoutes');
app.use('/api/customer',CustomerRoutes);
app.use('/api/products',ProductRoutes);
app.use('/api/orders',OrderRoutes);

//server testing
app.use('/',(req,res)=>{
    res.status(200).send({message:'welcome to my website'});
})
const port = process.env.PORT;
app.listen(port,()=>{
    console.log('server is running on port:'+port);
})


