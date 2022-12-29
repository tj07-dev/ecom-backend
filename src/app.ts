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

const app: Application = express();

app.use(cors());
app.use(express.json());

const port: number = Number(process.env.PORT) || 8000;

app.get('/', (req, res) => {
  res.send(
    `🚀 Add to cart backend server started. ${JSON.stringify(req.body)}`,
  );
});

/* Api to check stock (add)*/
app.post('/cart', (req: Request, res: Response) => {
  let id: number = req.body.id;
  let availability: number = req.body.stock;
  let quantity: number = req.body.quantity;
  if (availability > 0) {
    res.send(
      `Product ${id} is booked successfully and ${
        availability - quantity
      } is left.`,
    );
    console.log(
      `Product ${id} is booked successfully and ${
        availability - quantity - 1
      } is left.`,
    );
    return res.end;
  } else {
    res.send(`Product ${id} is currently out of stock`);
    console.log(`Product ${id} is currently out of stock`);
  }
  return res.end;
});

/* Api to check stock (remove)*/
app.post('/cartRemove', (req: Request, res: Response) => {
  let id: number = req.body.id;
  let availability: number = req.body.stock;
  let quantity: number = req.body.quantity;
  if (availability > 0) {
    res.send(
      `Product ${id} is removed from cart successfully and ${
        availability + quantity + 1
      } is left.`,
    );
    console.log(
      `Product ${id} is booked successfully and ${
        availability - quantity + 1
      } is left.`,
    );
    return res.end;
  }
  return res.end;
});

//checkout Api
app.post('/checkout', (req: Request, res: Response) => {
  let checkoutData = req.body;
  // console.log(checkoutData);
  var result = checkoutData.map((item: { id: number; quantity: number }) => {
    console.log(
      `Product ${item.id} with quantity ${item.quantity} is purchased successfully.`,
    );
  });
});

//Error Hadling
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});

//Error Handler
const errorHandler: ErrorRequestHandler = (err, req, res) => {
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
