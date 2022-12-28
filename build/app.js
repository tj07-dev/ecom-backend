"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = Number(process.env.PORT) || 8000;
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const productSchema = {
    id: Number,
    stock: Number,
};
app.get('/', (req, res) => {
    res.send(`🚀 Add to cart backend server started.${req.body}`);
});
app.post('/cart', (req, res) => {
    const checkStock = (stock) => {
        if (stock == 0) {
            return true;
        }
        else {
            return false || 0;
        }
    };
    //   res.send('Hello world');
    // let product = new productSchema(req.body)
    console.log(req.body.stock);
    if (req.body.id && req.body.stock) {
        let id = req.body.id;
        let availability = req.body.stock;
        console.log(1 == 1);
        if (checkStock(availability) == 0 || false) {
            res.send(`Product ${id} is booked successfully and ${availability - 1} is left in the stock`);
        }
        else {
            res.send(`Product ${id} is currently out of stock`);
        }
        res.end;
    }
    return res.end;
    // if (availability > 0) {
    //   console.log(availability);
    //   //   res.send(`🚀 Add to cart backend server started.${req.body}`);
    //   res.send(
    //     `Product ${id} is booked successfully and ${availability} is left in the stock`,
    //   );
    // } else {
    //   res.send(`Product ${id} is currently out of stock`);
    //
});
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
//Error Handler
const errorHandler = (err, req, res, next) => {
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
