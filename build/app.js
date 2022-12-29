"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = Number(process.env.PORT) || 8000;
app.get('/', (req, res) => {
    res.send(`🚀 Add to cart backend server started. ${JSON.stringify(req.body)}`);
});
/* Api to check stock (add)*/
app.post('/cart', (req, res) => {
    let id = req.body.id;
    let availability = req.body.stock;
    let quantity = req.body.quantity;
    if (availability > 0) {
        res.send(`Product ${id} is booked successfully and ${availability - quantity} is left.`);
        console.log(`Product ${id} is booked successfully and ${availability - quantity - 1} is left.`);
        return res.end;
    }
    else {
        res.send(`Product ${id} is currently out of stock`);
        console.log(`Product ${id} is currently out of stock`);
    }
    return res.end;
});
/* Api to check stock (remove)*/
app.post('/cartRemove', (req, res) => {
    let id = req.body.id;
    let availability = req.body.stock;
    let quantity = req.body.quantity;
    if (availability > 0) {
        res.send(`Product ${id} is removed from cart successfully and ${availability + quantity + 1} is left.`);
        console.log(`Product ${id} is booked successfully and ${availability - quantity + 1} is left.`);
        return res.end;
    }
    return res.end;
});
//checkout Api
app.post('/checkout', (req, res) => {
    let checkoutData = req.body;
    // console.log(checkoutData);
    var result = checkoutData.map((item) => {
        console.log(`Product ${item.id} with quantity ${item.quantity} is booked successfully.`);
    });
});
//Error Hadling
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
//Error Handler
const errorHandler = (err, req, res) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
};
app.use(errorHandler);
//Server
const server = app.listen(port, () => {
    console.log(`Connected Successfully on port ${port}`);
});
