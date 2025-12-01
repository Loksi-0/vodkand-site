import Database from '../database/dbController.js'

const db = new Database()

class pluginsController {
    async get(req, res) {
        const path = req.path.replace(/\//g, '')

        const data = await db.getData()
        const page = data[path]
        const tabNumber = Number(req.query.tab) || 1
        const isNavigation = req.query.navigation

        if (isNavigation) {
            try {
                const navigation = []

                page.forEach(element => {
                    const navElement = {
                        icon: element.icon,
                        title: element.title
                    }

                    navigation.push(navElement)
                })

                return res.status(200).json(navigation)
            } catch(e) {
                console.log(e.message)
                return
            }
        }

        if (!tabNumber) {
            try {
                return res.status(200).json(page[0])
            } catch(e) {
                console.log(e.message)
                return
            }
        } else if (!page[tabNumber - 1]) {
            try {
                return res.status(404).end()
            } catch(e) {
                console.log(e.message)
                return
            }
        }

        return res.status(200).json(page[tabNumber - 1])
    }
}

export default new pluginsController()