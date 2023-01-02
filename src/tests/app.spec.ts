import supertest from 'supertest';
import app from '../app';
import express, { request, Request } from 'express';

import { expect } from 'chai';
import { log } from 'console';
describe('Out of stock Test', () => {
  it('should POST /cart', async function () {
    const res = await supertest(app)
      .post('/cart')
      .send({ id: 46, stock: 0, quantity: 5 });
    expect(res.status).to.equal(200);
    expect(res.body).to.be.empty;
    expect(res.body).to.be.an('object');
    // expect(res.body.error).to.be.empty;
  });
});

// describe('Expacted', () => {
//   it('comparing ', async () => {
//     const a = { id: 46, stock: 0, quantity: 5 };

//     const expected = 'Product 46 is currently out of stock';
//     const res = await supertest(app).post('/cart').send(a);

//     console.log(expected);
//   });
// });

describe('Wrong Input Test', () => {
  it('POST /cart', async function () {
    const res = await supertest(app)
      .post('/cart')
      .send({ stock: 12, quantity: 5 });
    expect(res.status).to.equal(200);
    // expect(res.ok).to.be.true;
    // expect(res.body).to.be.an('object');
  });
});

describe('Stock Test', () => {
  it('POST /cart', async function () {
    const res = await supertest(app)
      .post('/cart')
      .send({ id: 23, stock: 12, quantity: 5 });
    expect(res.status).to.equal(200);
    expect(res.ok).to.be.true;
    expect(res.body).to.be.an('object');
  });
});

describe('Remove from cart Test', () => {
  it('POST /cart', async function () {
    const res = await supertest(app)
      .post('/cartRemove')
      .send({ id: 23, stock: 12, quantity: 5 });
    expect(res.status).to.equal(200);
    expect(res.ok).to.be.true;
    expect(res.body).to.be.an('object');
  });
});

// let request: Request;
// describe('Testing POSTS/shots endpoint', function () {
//   it('respond with valid HTTP status code and description and message', function (done) {
//     // Make POST Request
//     const response = await supertest(app).post('/shots').send({
//       title: 'How to write a shot',
//       body: 'Access the Edpresso tutorial',
//     });

//     // Compare response with expectations
//     expect(response.status).toBe(200);
//     expect(response.body.status).toBe('success');
//     expect(response.body.message).toBe('Shot Saved Successfully.');
//   });
// });
