/*  定义本地数据存储，提取方法*/

const USER_KEY = 'user';

function setItem(user) {
  //需要存储的数据是字符串，但是我们的数据是对象，需要先转换成对象字符串
  localStorage.setItem(USER_KEY,JSON.stringify(user));
}

function getItem() {
  //存储的数据是对象字符串，所以获取的也是，需要转化成对象
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeItem() {
  localStorage.removeItem(USER_KEY);
}

export {
  setItem,
  getItem,
  removeItem
}