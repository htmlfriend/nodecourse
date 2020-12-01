// import BSON from 'bson';
// import { readFileSync } from 'fs';
import express from 'express';
// import mongodb from 'mongodb';
import mongoose from 'mongoose';
import mstore from 'connect-mongo';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import fs from 'fs';
import appSrc from './app.js';
import dot from 'dotenv';
import CORS from '../../CORS.js';
import UserModel from './models/User.js';
import UserController from './routers/UserController.js';
dot.config({ path: './.env' });
const { URL } = process.env;
const User = UserModel(mongoose);
const app = appSrc(
  express,
  bodyParser,
  fs,
  CORS,
  User,
  UserController,
  mongoose,
  cookieParser,
  session,
  mstore
);

try {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  app.listen(process.env.PORT ?? 4321);
} catch (error) {
  console.log(error.codeName);
}

// const {
//   MongoClient: { connect },
// } = mongodb;

// app.use(async (r) => {
//   const conn = await connect(URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   const db = conn.db('mongodemo');
//   const result = await db
//     .collection('users')
//     .updateOne({ login: 'yurii2' }, { $set: { password: 'sonofgloin hello' } });
//   const result2 = await db
//     .collection('users')
//     .insertOne({ login: 'yurii3', password: 'gardalf' });
//   const result1 = await db.collection('users').find().toArray();
//   r.res.json(result1);
// });

// console.log(BSON.serialize({})); // 05 00 00 00 00
// console.log(BSON.serialize({ a: true }));
// console.log(BSON.serialize({ goss: 'helo' }).length);

// let a = 'goss';
// a.split('').forEach((x) => console.log(x.charCodeAt(0).toString(16)));

// const buffer = readFileSync('./dump/users/users.bson');
// console.log('buffer', buffer);
// console.log('read DB', BSON.deserialize(buffer));
// import Sentiment from 'sentiment';

// var sentiment = new Sentiment();
// var result = sentiment.analyze('kids');
// console.dir(result); // Score: -2, Comparative: -0.666
// currying in Javascript

// Function.prototype.curry = function (...args) {
//   const currying = (fn, ...args) => {
//     fn.length <= args.length
//       ? fn(...args)
//       : (...others) => {
//           currying(fn, ...args, ...others);
//         };
//   };
//   return currying(this, ...args);
// };

// function curry(_f) {
//   return (x) => (y) => (z) => _f(x, y, z);
// }

// function f(x, y, z) {
//   return x + y + z;
// }

// console.log('curry', curry(f)(1)(2)(3));
// console.log('f.curry', f.call(curry, 1, 2, 3));
// console.log('f.curry', f.apply(curry, [1, 2, 3]));
