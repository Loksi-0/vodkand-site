import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

class Database {
  constructor() {
    this.filePath = path.join(__dirname, 'data.json')
  }

  async getData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf8')
      return JSON.parse(data)
    } catch (e) {
      return e.message
    }
  }
}

export default Database