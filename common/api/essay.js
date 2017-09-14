import fs from 'fs'
import MT from 'mark-twain'

const demoPath = 'data/blog/demo.md'

export const fetchDemo = async () => {
  return new Promise((resolve, reject) => {
    fs.readFile(demoPath, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(MT(res.toString()))
      }
    })
  })
}

