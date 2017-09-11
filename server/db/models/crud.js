
const read = async ({model, params}) => {
  return await new Promise((resolve, reject) => {
    model.findOne(params, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          status: true
        })
      }
    })
  })
}

export {
  read
}
