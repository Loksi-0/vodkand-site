import cron from 'node-cron'
import User from '../models/User.js'

class DeleteAccountManager {
  async deleteUnusedAccounts() {
    try {
      const users = await User.find({ hasPass: false }, { creationDate: 1 })

      let deleted = 0

      for (const user of users) {
        if (await this.checkAndDelete(user)) {
          deleted++
        }
      }

      console.log(`Deleted ${deleted} accounts`)
    } catch (e) {
      console.log(e)
    }
  }

  checkAndDelete = async (user) => {
    try {
      if (!user.creationDate) {
        return false
      }

      const expireDate = new Date(
        user.creationDate.getTime() + this.daysToExpire * 24 * 60 * 60 * 1000
      )

      const isExpired = expireDate < Date.now()

      if (isExpired && !user.hasPass) {
        await User.deleteOne({ _id: user._id })
        return true
      }

      return false
    } catch (e) {
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
      if (process.env.ENABLE_ACCOUNT_CLEANUP !== 'true') {
        return
      }

      this.deleteUnusedAccounts()
    })
  }
}

export default DeleteAccountManager
