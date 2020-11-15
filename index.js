// function task(x) {
//   let promise = new Promise((resolve, reject) => {
//     if (x < 18) {
//       let success = 'yes';
//       resolve(success);
//     } else {
//       let fail = new Error('no');
//       reject(fail);
//     }
//   });
//   let result = function () {
//     promise.then((full) => full).catch((err) => err);
//   };
//   result();
// }
const promisify = (func) => (...args) =>
  new Promise((resolve, reject) =>
    func(...args, (err, result) => (err ? reject(err) : resolve(result)))
  );
const delay = promisify((d, cb) => setTimeout(cb, d));
delay(2000).then(() => console.log('Hi!'));
