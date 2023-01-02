"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
app.post('/cart', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.id || (req.body.stock && req.body.quantity)) {
        let id = req.body.id;
        let availability = req.body.stock;
        let quantity = req.body.quantity;
        if (availability > 0) {
            res.send(`Product ${id} is booked successfully and ${availability - quantity - 1} is left.`);
            console.log(`Product ${id} is booked successfully and ${availability - quantity - 1} is left.`);
            return res.end;
        }
        else {
            console.log(`Product ${id} is currently out of stock`);
            res.send(`Product ${id} is currently out of stock`);
        }
        return res.end;
    }
    else {
        res.send('Something went wrong');
        console.log('Something went wrong');
    }
}));
/* Api to check stock (remove)*/
app.post('/cartRemove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.id && req.body.stock && req.body.quantity) {
        let id = req.body.id;
        let availability = req.body.stock;
        let quantity = req.body.quantity;
        if (availability > 0) {
            res.send(`Product ${id} is removed from cart successfully and ${availability - quantity + 1} is left.`);
            console.log(`Product ${id} is removed from cart successfully and Total ${availability - quantity + 1} is now available.`);
            return res.end;
        }
        res.statusMessage = 'Something went wrong';
        return res.end;
    }
    else {
        res.send('Something went wrong');
        console.log('Something went wrong');
    }
}));
//checkout Api
app.post('/checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let checkoutData = req.body;
    // console.log(checkoutData);
    var result = checkoutData.map((item) => {
        console.log(`Product ${item.id} with quantity ${item.quantity} is purchased successfully.`);
    });
}));
//Error Handling
app.use((req, res, next) => {
    next(new http_errors_1.default.NotFound());
});
//Error Handler
const errorHandler = (error, req, res) => {
    res.status(error.status || 404);
    res.send({
        status: error.status || 404,
        message: error.message,
    });
};
app.use(errorHandler);
//Server
const server = app.listen(port, () => {
    console.log(`Backend server started Successfully on port ${port}`);
});
exports.default = app;
