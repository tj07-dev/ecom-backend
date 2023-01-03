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
            const data = {
                message: `Product ${id} is booked successfully and ${availability - quantity - 1} is left.`,
                theme: 'success',
            };
            res.send(data);
            console.log(data.message);
            return res.end;
        }
        else {
            const data = {
                message: `Product ${id} is currently out of stock`,
                theme: 'fail',
            };
            res.send(data);
            console.log(data.message);
        }
        return res.end;
    }
    else {
        const data = {
            message: 'Something went wrong',
            theme: 'fail',
        };
        res.send(data);
        console.log(data.message);
    }
}));
/* Api to check stock (remove)*/
app.post('/cartRemove', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.id && req.body.stock && req.body.quantity) {
        let id = req.body.id;
        let availability = req.body.stock;
        let quantity = req.body.quantity;
        if (availability > 0) {
            const data = {
                message: `Product ${id} is removed from cart successfully and ${availability - quantity + 1} is left.`,
                theme: 'info',
            };
            res.send(data);
            console.log(data.message);
            // return res.end(jsonData);
        }
        return res.end;
    }
    else {
        const data = {
            message: 'Something went wrong',
            theme: 'fail',
        };
        res.send(data);
        console.log(data.message);
    }
}));
//checkout Api
app.post('/checkout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Content-Type', 'application/json');
    res.type('json');
    let checkoutData = req.body;
    // console.log(checkoutData);
    var result = checkoutData.map((item) => {
        console.log(`Product ${item.id} with quantity ${item.quantity} is purchased successfully.`);
    });
    const data = {
        message: 'Product checkout successfully',
        theme: 'success',
    };
    res.send(data);
    console.log(data.message);
    res.end;
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
