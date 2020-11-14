function task(x) {
  let message = x < 18 ? 'eye' : 'no';
  // let promise = new Promise((resolve, reject) => {
  //   if (x < 18) {
  //     resolve('yes');
  //   } else {
  //     reject('no');
  //   }
  // });
  return Promise.resolve(message);
}
