// 这里是封装本地存储的token的模块
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
export const setItem = (name, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // setItem 后面的括号里面是一组键值对，要传两个值
  window.localStorage.setItem(name, value)
}
export const remove = name => {
  window.localStorage.removeItem(name)
}
