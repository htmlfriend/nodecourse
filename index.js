function task(x) {
  let promise = new Promise((resolve, reject) => {
    if (x < 18) {
      let success = 'yes';
      resolve(success);
    } else {
      let fail = new Error('no');
      reject(fail);
    }
  });
  let result = function () {
    promise.then((full) => full).catch((err) => err);
  };
  result();
}