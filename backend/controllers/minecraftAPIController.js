import ApiError from '../exceptions/apiError.js'

class minecraftAPIController {
    async getPlayerPunishments(req, res, next) {
        try {
            const username = req.query.username

            if (!username) {
                throw ApiError.BadRequest('Необходимо указать username')
            }

            const response = await fetch(
                `${process.env.MINECRAFT_API_URL}/v1/libertybans/all?username=${encodeURIComponent(username)}`, 
                {
                    headers: {
                        'Authorization': process.env.MINECRAFT_API_KEY,
                        'Accept': 'application/json'
                    }      
                }
            )

            if (!response.ok) {
                const json = await response.json()
                res.status(response.status).json(json)
            }

            const data = await response.json()

            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async getWhitelist(req, res, next) {
        try {
            const response = await fetch(
                `${process.env.MINECRAFT_API_URL}/v1/whitelist`, 
                {
                    headers: {
                        'Authorization': process.env.MINECRAFT_API_KEY,
                        'Accept': 'application/json'
                    }
                }
            )

            if (!response.ok) {
                const json = await response.json()
                res.status(response.status).json(json)
            }

            const data = await response.json()

            return res.json(data)
        } catch(e) {
            next(e)
        }
    }

    async postWhitelist(req, res, next) {
        try {
            const nickname = req.body?.nickname

            if (!nickname) {
                return res.status(400).json('Необходимо указать nickname')
            }

            const response = await fetch(
                `${process.env.MINECRAFT_API_URL}/v1/whitelist?username=${nickname}`, 
                {
                    method: 'POST',
                    headers: {
                        'Authorization': process.env.MINECRAFT_API_KEY,
                        'Accept': 'application/json'
                    }
                }
            )

            if (!response.ok) {
                const text = await response.text()
                let error

                try {
                    error = JSON.parse(text)
                } catch {
                    error = text
                }
                
                return res.status(response.status).json(text.error)
            }

            const data = await response.json()

            return res.json(data)
        } catch(e) {
            next(e)
        }
    }
}

export default new minecraftAPIController()