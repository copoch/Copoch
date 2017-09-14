import { value } from './mock/counter.json'

export const fetchCounter = () => {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(() => {
      clearTimeout(timer)
      resolve(value)
    }, 500)
  })
}

