import cron from 'node-cron'
import User, { type UserDocument } from '../models/User.js'
import getEnv from '../helpers/getEnv.js'

class DeleteAccountManager {
  private daysToExpire: number

  async deleteUnusedAccounts() {
    try {
      const users = await User.find({ hasPass: false }, { creationDate: 1 })

      let deleted = 0

      for (const user of users) {
        if (await this.checkAndDelete(user)) {
          deleted++
        }
      }

      console.log(`Deleted ${String(deleted)} accounts`)
    } catch (e) {
      console.log(e)
    }
  }

  checkAndDelete = async (user: UserDocument) => {
    try {
      const expireDate =
        user.creationDate.getTime() + this.daysToExpire * 24 * 60 * 60 * 1000

      const isExpired = expireDate < Date.now()

      if (isExpired && !user.hasPass) {
        await User.deleteOne({ _id: user._id })
        return true
      }

      return false
    } catch (e: unknown) {
      console.log(e)
      return false
    }
  }

  constructor() {
    this.daysToExpire = 10

    console.log(
      'Checking expired accounts to delete. Days to expire:',
      this.daysToExpire
    )

    cron.schedule('0 3 * * *', () => {
      if (getEnv('ENABLE_ACCOUNT_CLEANUP') !== 'true') {
        return
      }

      void this.deleteUnusedAccounts()
    })
  }
}

export default DeleteAccountManager
