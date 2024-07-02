export const pipe = (args, func, ...funcs) =>
  funcs.reduce((acc, cb)=>cb(acc), func(...args)) 