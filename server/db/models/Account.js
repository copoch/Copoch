import crypto from 'crypto'
import mongoose from 'mongoose'
import {read} from './crud'

mongoose.Promise = global.Promise;
const conn = mongoose.createConnection('mongodb://localhost:27017/copoch');
// Schema
const AccountSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    }
  },
  photoUrl: {
    type: String
  },
  biography: {
    type: String
  }
})
// Model
const Account = conn.model('Account', AccountSchema)

// operations
const register = async (phone, password, firstName, lastName) => {
  const shaSum = crypto.createHash('sha256')
  shaSum.update(password)

  const user = new Account({
    phone: phone,
    name: {
      firstName,
      lastName
    },
    password: shaSum.digest('hex')
  })

  return await new Promise((resolve, reject) => {
    return user.save((err) =>{
      if (err) {
        reject(err)
      } else {
        resolve({
          status: true,
          message: 'Account was created.'
        })
      }
    })
  })
}

const login = async (phone, password) => {
  const shaSum = crypto.createHash('sha256')
  shaSum.update(password)

  return await new Promise((resolve, reject) => {
    return Account.findOne({
      phone,
      password: shaSum.digest('hex')
    }, (err, doc) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          status: true,
          message: 'login succeed.'
        })
      }
    })
  })
}
const changePassword = async (accountId, newPassword) => {
  const shaSum = crypto.createHash('sha256')
  shaSum.update(newPassword)

  return await new Promise((resolve, reject) => {
    Account.update(
      {_id: accountId},
      {$set: {password: shaSum.digest('hex')}},
      (err) => {
        if (err) {
          reject(err)
        } else {
          resolve({
            status: true,
            message: 'change password succeed.'
          })
        }
      }
    )
  })
}
const forgotPassword = async (email, resetPasswordUrl) => {
  const user = await read(
    {
      model: Account,
      params: {
        email
      }
    }
  )

  // user
  //   .then(())

}

// export
export {
  register,
  login,
  changePassword,
  forgotPassword
}
