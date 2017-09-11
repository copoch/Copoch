import mongodb from 'mongodb'

const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017/copoch'
import { pool, poolSize } from './config'

// 连接 mongodb
export const connectDb = () => {
  let poolLength = pool.length

  if (poolLength < poolSize) {
    pool.unshift(
      new Promise((resolve, reject) => {
        return MongoClient.connect(url, function(err, db) {
          if (err) {
            reject(err)
          }

          // db.close();
          resolve({
            status: true,
            payload: {
              db
            }
          })
        });
      })
    )

    return pool[0]
  } else {
    return pool[Math.round(Math.random() * 10)]
  }

}

// 关闭数据
export const closeDb = (db) => {
  return db.close()
}

// 获取数据
export const findDocuments = async ({ params }) => {
  const { status, payload = {} } = await connectDb()

  if (status && payload.db) {
    const db = payload.db
    const collection = db.collection('documents');

    return await new Promise((resolve, reject) => {
      collection.find({}).toArray((err, docs) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            status: true,
            message: 'Inserted ' + params.length + ' documents succeed.',
            payload: docs
          })
        }
      })
    })
  }
}

// 插入数据
export const insertDocuments = async ({ api, params }) => {
  const { status, payload = {} } = await connectDb()

  if (status && payload.db) {
    const db = payload.db
    const collection = db.collection('documents');

    !Array.isArray(params) && (params = [params])

    return await new Promise((resolve, reject) => {
      collection.insertMany(params, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            status: true,
            message: '                                                                                                                                                                                                                       Inserted ' + params.length + ' documents succeed.',
            payload: res
          })
        }
      })
    })
  }
}

// 更新数据
export const updateDocuments = async () => {

}

// 删除数据
export const deleteDocuments = async () => {

}
