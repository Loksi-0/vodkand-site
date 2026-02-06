import ApiError from '../../exceptions/ApiError.js'
import crypto from 'crypto'
import { OAuth2Client } from 'google-auth-library'
import getEnv from '../../helpers/getEnv.js'
import type { Request, Response, NextFunction } from 'express'
import type { HandleCodeQuery } from './types.js'

class openIDController {
  generateRedirectUri = (req: Request) => {
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

    params.append(
      'redirect_uri',
      `${getEnv('API_DOMAIN')}${getEnv('API_URL')}/auth/google/callback`
    )
    params.append('client_id', getEnv('OAUTH_GOOGLE_CLIENT_ID'))
    params.append('response_type', 'code')
    params.append('scope', 'openid email')
    params.append('state', randomState)
    params.append('code_challenge', codeChallenge)
    params.append('code_challenge_method', 'S256')

    return `${baseUrl}?${params.toString()}`
  }

  redirect = (req: Request, res: Response, next: NextFunction) => {
    try {
      const uri = this.generateRedirectUri(req)

      res.redirect(302, uri)
      return
    } catch (e) {
      next(e)
    }
  }

  handleCode = async (
    req: QueryRequest<HandleCodeQuery>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const client = new OAuth2Client(getEnv('OAUTH_GOOGLE_CLIENT_ID'))

      const { code, state, error } = req.query
      const googleTokenUrl = 'https://oauth2.googleapis.com/token'

      if (error) {
        res.redirect(
          302,
          `${getEnv('CLIENT_DOMAIN')}/auth/google?error=${error}`
        )
        return
      }

      if (!code || !state) {
        throw ApiError.BadRequest('Отсутствует параметр code или state')
      }

      if (!req.session.oauthState || req.session.oauthState !== state) {
        throw ApiError.BadRequest('Invalid state')
      }

      if (
        !req.session.oauthStateCreatedAt ||
        Date.now() - req.session.oauthStateCreatedAt > 10 * 60 * 1000
      ) {
        throw ApiError.BadRequest('State is expired')
      }

      if (!req.session.pkceVerifier) {
        throw ApiError.BadRequest('No code verifier')
      }

      const response = await fetch(googleTokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: getEnv('OAUTH_GOOGLE_CLIENT_ID'),
          client_secret: getEnv('OAUTH_GOOGLE_CLIENT_SECRET'),
          grant_type: 'authorization_code',
          redirect_uri: `${getEnv('API_DOMAIN')}${getEnv('API_URL')}/auth/google/callback`,
          code: code,
          code_verifier: req.session.pkceVerifier
        })
      })

      if (!response.ok) {
        const error = (await response.json()) as { error: string }
        res.redirect(
          302,
          `${getEnv('CLIENT_DOMAIN')}/auth/google?error=${error.error}`
        )
        return
      }

      const data = (await response.json()) as { id_token: string }

      const idToken = data.id_token
      const ticket = await client.verifyIdToken({
        idToken,
        audience: getEnv('OAUTH_GOOGLE_CLIENT_ID')
      })
      const payload = ticket.getPayload()

      if (!payload) {
        throw ApiError.BadRequest('No payload')
      }

      const { email, email_verified, sub } = payload

      if (!email_verified) {
        const error = 'Почта не подтверждена в Google'
        res.redirect(
          302,
          `${getEnv('CLIENT_DOMAIN')}/auth/google?error=${error}`
        )
        return
      }

      if (!email) {
        const error = 'Не удалось найти почту'
        res.redirect(
          302,
          `${getEnv('CLIENT_DOMAIN')}/auth/google?error=${error}`
        )
        return
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

      res.redirect(
        302,
        `${getEnv('CLIENT_DOMAIN')}/auth/google?code=${tempCode}`
      )
      return
    } catch (e) {
      next(e)
    }
  }
}

export default new openIDController()
