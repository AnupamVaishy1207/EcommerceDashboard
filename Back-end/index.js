const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const jwt = require("jsonwebtoken");

const app = express();
const jwtKey = "ecomm";

// Middleware
app.use(express.json());
app.use(cors());

// Route for Registration
app.post("/register", async(req, resp) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    jwt.sign({ result }, jwtKey, { expiresIn: "22h" }, (err, token) => {
        if (err) {
            resp.send({ result: "Something went wrong. Please try again later" });
        }
        resp.send({ result, auth: token });
    });
});

// Route for Login
app.post("/login", async(req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne({ email: req.body.email }).select(
            "-password"
        );
        if (user) {
            jwt.sign({ user }, jwtKey, { expiresIn: "22h" }, (err, token) => {
                if (err) {
                    resp.send({
                        result: "Something went wrong. Please try again later",
                    });
                }
                resp.send({ user, auth: token });
            });
        } else {
            resp.send({ result: "No User Found" });
        }
    }
});

// Route for Adding a Product
app.post("/add-product", verifyToken, async(req, resp) => {
    let product = new Product(req.body);
    let result = await product.save();
    resp.send(result);
});

// Route for Product List
app.get("/all-product", verifyToken, async(req, resp) => {
    let products = await Product.find();
    if (products.length > 0) {
        resp.send(products);
    } else {
        resp.send({ result: "No products found" });
    }
});

// Route for Deleting a Product
app.delete("/product/:id", verifyToken, async(req, resp) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    resp.send(result);
});

// Route for Updating a Product
app.get("/product/:id", verifyToken, async(req, resp) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "Result not found" });
    }
});

// Route for Updating a Product
app.put("/product/:id", verifyToken, async(req, resp) => {
    let result = await Product.updateOne({ _id: req.params.id }, { $set: req.body });
    resp.send(result);
});

// Route for Searching
app.get("/search/:key", verifyToken, async(req, resp) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { price: { $regex: req.params.key } },
        ],
    });
    resp.send(result);
});

// Verify Token Middleware
function verifyToken(req, resp, next) {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please provide a valid token" });
            } else {
                next();
            }
        });
    } else {
        resp.status(403).send({ result: "Please provide a token with the header" });
    }
}

// Start the server
app.listen(6500);
// const express = require("express");
// const cors = require("cors");
// require("./db/config");
// const User = require("./db/User");
// const Product = require("./db/Product");
// const Jwt = require("jsonwebtoken");

// const app = express();
// const jwtKey = "ecomm";
// ///

// //middleware
// app.use(express.json());
// app.use(cors());

// // Creating route for Registration
// app.post("/register", async(req, resp) => {
//     let user = new User(req.body);
//     let result = await user.save();
//     //Hide password from api call
//     result = result.toObject();
//     delete result.password;
//     Jwt.sign({ result }, jwtKey, { expiresIn: "22h" }, (err, token) => {
//         if (err) {
//             resp.send({ result: "Something went wrong. Please try after some time" });
//         }
//         resp.send({ result, auth: token });
//     });
// });
// // Creating route for Login
// app.post("/login", async(req, resp) => {
//     console.log(req.body);
//     if (req.body.password && req.body.email) {
//         // let user = await User.findOne(req.body).select("-password");
//         let user = await User.findOne({ email: req.body.email }).select(
//             "-password"
//         );
//         if (user) {
//             Jwt.sign({ user }, jwtKey, { expiresIn: "22h" }, (err, token) => {
//                 if (err) {
//                     resp.send({
//                         result: "Something went wrong. Please try after some time",
//                     });
//                 }
//                 resp.send({ user, auth: token });
//             });

//         } else {
//             resp.send({ result: "No User Found" });
//         }
//     }
// });
// // Creating route for Product
// app.post("/add-product", verifyToken, async(req, resp) => {
//     let product = new Product(req.body);
//     let result = await product.save();
//     resp.send(result);
// });

// // Creating route for Product List
// app.get("/products", verifyToken, async(req, resp) => {
//     let products = await Product.find();
//     if (products.length > 0) {
//         resp.send(products);
//     } else {
//         resp.send({ result: "No products found" });
//     }
// });
// // Creating route for Delete products
// app.delete("/product/:id", verifyToken, async(req, resp) => {
//     const result = await Product.deleteOne({ _id: req.params.id });
//     resp.send(result);
// });
// // Creating route for update List/
// app.get("/product/:id", verifyToken, async(req, resp) => {
//     let result = await Product.findOne({ _id: req.params.id });
//     if (result) {
//         resp.send(result);
//     } else {
//         resp.send({ result: "Result not found." });
//     }
// });
// // Creating route for update List/
// app.put("/product/:id", verifyToken, async(req, resp) => {
//     let result = await Product.updateOne({
//         _id: req.params.id,
//     }, {
//         $set: req.body,
//     });
//     resp.send(result);
// });
// // Creating route for Search
// app.get("/search/:key", verifyToken, async(req, resp) => {
//     let result = await Product.find({
//         $or: [
//             { name: { $regex: req.params.key } },
//             { company: { $regex: req.params.key } },
//             { category: { $regex: req.params.key } },
//             { price: { $regex: req.params.key } },
//         ],
//     });

//     resp.send(result);
// });

// function verifyToken(req, resp, next) {
//     let token = req.headers['authorization'];
//     if (token) {
//         console.log(token);
//         token = token.split(' ')[1];
//         Jwt.verify(token, jwtKey, (err, valid) => {
//             if (err) {
//                 resp.status(401).send({ result: "please provide valid token" });
//             } else {
//                 next();
//             }
//         })
//     } else {
//         resp.status(403).send({ result: "please provide token with header" });
//     }
// }


// app.listen(6500);