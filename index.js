import express from 'express';
import cors from 'cors';
import { dbConnect } from './Database/db_connection.js'; 
import { Routes } from './Routes/Routes.js'
import dotenv from 'dotenv'; 

dotenv.config() 

const PORT = process.env.PORT || 5000;          

const app = express();


(async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log("Server running in PORT: ", PORT);
  })
})();


app.use(cors());             // It will allow all origins to access the resource from backend.

// app.use(     // It will allow only the mentioned origin to access the resource from backend.
//   cors({
//     origin: "https://job-portal-rajdeeprautela.vercel.app",    // It will allow requests from only localhost:5173 origin to access the resource from backend.    
//     // origin: "*",  means allow all origins to access resource from backend.

//     credentials: true,          // It allows the credentials to be shared between the frontend and backend like cookies can be shared between the frontend and backend.

//     allowedHeaders: ["Content-Type", "Authorization"],      // It means it will allow creation of only the mentioned headers as the cutom Headers.

//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],      // It allows only these requests from the origin.
//   })
// )

app.use(express.json({ exteded: true, limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

const allowedOrigins = [
  'http://localhost:3000', // Local development
  'https://job-portal-rajdeeprautela.vercel.app' // Production frontend
];
// Middlware for Headers ====================================================
app.use((req, res, next) => {       // Without this middleware, the frontend will not be able to access the headers from the backend.

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin); // It will allow only the mentioned origin to access the resource from backend.
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // It will allow only the mentioned headers to be created as the custom headers.
  res.setHeader('Access-Control-Expose-Headers', 'Authorization'); // It will allow only the mentioned headers to be exposed to the frontend.
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Credentials', true);
  next();
})

// Api Routes Middleware ====================================================

app.use('/', Routes)

