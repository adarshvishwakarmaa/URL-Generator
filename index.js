// const express = require("express");
// const path = require("path")
// const cookieParser = require("cookie-parser")
// const { connectToMongoDb } = require("./connect");
// const {restrictToLoggedinUserOnly,checkAuth} = require("./middlewares/auth")
// const URL = require("./models/url");
// const urlRoute = require("./routes/url");
// const staticRoute =require("./routes/staticRouter")
// const userRoute = require("./routes/User")  //errror user change User

// const app = express();
// const port = 6000;

// connectToMongoDb("mongodb://localhost:27017/random-url").then(() =>
//   console.log("MongoDb is connected!!")
// );
// app.set("view engine","ejs")
// app.set("views",path.resolve("./views"))
// app.use(express.json());
// app.use(express.urlencoded({extended:false}))
// app.use(cookieParser())


// app.use("/url",restrictToLoggedinUserOnly, urlRoute);
// app.use("/user",userRoute);
// app.use("/",checkAuth,staticRoute);


// app.get('/url/:shortId',async (req,res) => {
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//         shortId,
//     },{
//         $push:{
//             visitHistory:{
//                 timestamp:Date.now(),
//             }
//         }
//     });
//     // // res.redirect(entry.redirectURL);
//     // if (!entry) {
//     //     // If no entry is found, return a 404 or some error message
//     //     return res.status(404).send('URL not found');
//     // }

//     // // Proceed to redirect if the entry exists
//     res.redirect(entry.redirectURL);
// });
// // })

// app.listen(port, () => console.log(`Server Started at port:${port} `));




const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDb } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/User");  //errror user change User

const app = express();
const PORT = 8002;

connectToMongoDb("mongodb://localhost:27017/random-url").then(() =>
    console.log("MongoDb is connected!!")
    );

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
