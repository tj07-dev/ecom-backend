import express, {
  Application,
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express';
import { Server } from 'http';
import createHttpError from 'http-errors';
import cors from 'cors';

import bodyParser from 'body-parser';

const app: Application = express();
app.use(cors());
app.use(express.json());
const port: number = Number(process.env.PORT) || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const productSchema = {
  id: Number,
  stock: Number,
};
app.get('/', (req, res) => {
  res.send(`🚀 Add to cart backend server started.${req.body}`);
});

app.post('/cart', (req: Request, res: Response) => {
  const checkStock = (stock: number) => {
    if (stock == 0) {
      return true;
    } else {
      return false || 0;
    }
  };
  //   res.send('Hello world');
  // let product = new productSchema(req.body)
  console.log(req.body.stock);
  if (req.body.id && req.body.stock) {
    let id: number = req.body.id;
    let availability: number = req.body.stock;
    console.log(1 == 1);
    if (checkStock(availability) == 0 || false) {
      res.send(
        `Product ${id} is booked successfully and ${
          availability - 1
        } is left in the stock`,
      );
    } else {
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

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

//Error Handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

//Server
const server: Server = app.listen(port, () => {
  console.log(`Connected Successfully on port ${port}`);
});
