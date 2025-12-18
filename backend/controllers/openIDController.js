import ApiError from '../exceptions/apiError.js'
import State from '../models/State.js'
import crypto from 'crypto'
import { jwtDecode } from 'jwt-decode'

class openIDController {
    generateRedirectUri = async (next) => {
        try {
            const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
            const params = new URLSearchParams()

            const randomState = crypto.randomBytes(16).toString('hex')

            await State.create({ state: randomState })

            params.append('redirect_uri', `${process.env.CLIENT_URL}/auth/google`)
            params.append('client_id', process.env.OAUTH_GOOGLE_CLIENT_ID)
            params.append('response_type', 'code')
            params.append('scope', 'openid email')
            params.append('state', randomState)

            return `${baseUrl}?${params.toString()}`
        } catch(e) {
            next(e)
        }
    }

    redirect = async (req, res, next) => {
        const uri = await this.generateRedirectUri(next)

        return res.redirect(302, uri)
    }

    async handleCode(req, res, next) {
        try {
            const { code, state } = req.body
            const googleTokenUrl = 'https://oauth2.googleapis.com/token'

            const stateFromDb = State.findOne({ state })

            if (!stateFromDb) {
                throw ApiError.BadRequest('параметр state не совпадает')
            }

            const response = await fetch(googleTokenUrl, {
                method: 'POST',
                body: JSON.stringify({
                    client_id: process.env.OAUTH_GOOGLE_CLIENT_ID,
                    client_secret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
                    grant_type: 'authorization_code',
                    redirect_uri: `${process.env.CLIENT_URL}/auth/google`,
                    code: code
                })
            })

            if (!response.ok) {
                throw new Error(`Ошибка при выполнении запроса к google. ${response.json()}`)
            }

            const data = await response.json()

            const idToken = data.id_token
            const userData = jwtDecode(idToken)

            return res.json(userData)
        } catch(e) {
            next(e)
        }
    }
}

export default new openIDController()