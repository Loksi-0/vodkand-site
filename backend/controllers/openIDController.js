import ApiError from '../exceptions/ApiError.js'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'

class openIDController {
    generateRedirectUri = async (req, next) => {
        try {
            const baseUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
            const params = new URLSearchParams()

            const randomState = crypto.randomBytes(32).toString('hex')

            req.session.oauthState = randomState
            req.session.oauthStateCreatedAt = Date.now()

            const codeVerifier = crypto.randomBytes(32).toString('base64url')
            req.session.pkceVerifier = codeVerifier

            const codeChallenge = crypto
                .createHash('sha256')
                .update(codeVerifier)
                .digest('base64url')

            params.append('redirect_uri', `${process.env.API_DOMAIN}/auth/google/callback`)
            params.append('client_id', process.env.OAUTH_GOOGLE_CLIENT_ID)
            params.append('response_type', 'code')
            params.append('scope', 'openid email')
            params.append('state', randomState)
            params.append('code_challenge', codeChallenge)
            params.append('code_challenge_method', 'S256')

            return `${baseUrl}?${params.toString()}`
        } catch(e) {
            next(e)
        }
    }

    redirect = async (req, res, next) => {
        const uri = await this.generateRedirectUri(req, next)

        return res.redirect(302, uri)
    }

    async handleCode(req, res, next) {
        try {
            const client = new OAuth2Client(process.env.OAUTH_GOOGLE_CLIENT_ID)

            const { code, state, error } = req.query
            const googleTokenUrl = 'https://oauth2.googleapis.com/token'

            if (error) {
                return res.redirect(302, `${process.env.CLIENT_DOMAIN}/auth/google?error=${error}`)
            }

            if (!code || !state) {
                throw ApiError.BadRequest('Отсутствует параметр code или state')
            }

            if (!req.session.oauthState || req.session.oauthState !== state) {
                throw ApiError.BadRequest('Invalid state')
            }

            if (Date.now() - req.session.oauthStateCreatedAt > 10 * 60 * 1000) {
                throw ApiError.BadRequest('State is expired')
            }

            const response = await fetch(googleTokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    client_id: process.env.OAUTH_GOOGLE_CLIENT_ID,
                    client_secret: process.env.OAUTH_GOOGLE_CLIENT_SECRET,
                    grant_type: 'authorization_code',
                    redirect_uri: `${process.env.API_DOMAIN}/auth/google/callback`,
                    code: code,
                    code_verifier: req.session.pkceVerifier
                })
            })

            if (!response.ok) {
                const error = await response.json()
                return res.redirect(302, `${process.env.CLIENT_DOMAIN}/auth/google?error=${error.error}`)
            }

            const data = await response.json()

            const idToken = data.id_token
            const ticket = await client.verifyIdToken({
                idToken,
                audience: process.env.OAUTH_GOOGLE_CLIENT_ID
            })
            const { email, email_verified, sub } = ticket.getPayload()

            if (!email_verified) {
                const error = 'Почта не подтверждена в Google'
                return res.redirect(302, `${process.env.CLIENT_DOMAIN}/auth/google?error=${error}`)
            }

            const tempCode = crypto.randomUUID()

            req.session.googleAuthTemp = {
                code: tempCode,
                email,
                sub,
                createdAt: Date.now()
            }

            delete req.session.oauthState
            delete req.session.oauthStateCreatedAt

            delete req.session.pkceVerifier

            return res.redirect(302, `${process.env.CLIENT_DOMAIN}/auth/google?code=${tempCode}`)
        } catch(e) {
            next(e)
        }
    }
}

export default new openIDController()