const mediaType = 'application/json'
const charset = 'charset=utf-8'
export const CONTENT_TYPE_JSON = `${mediaType};${charset}`

const isJson = (contentType) => contentType === mediaType || contentType.startsWith(`${mediaType};`)
const alreadyEncoded = (body) => typeof body === 'string'

/**
 * Automatically encode your objects into JSON
 *
 * Example:
 * client.User.all({ body: { name: 'bob' } })
 * // => body: {"name":"bob"}
 * // => header: "Content-Type=application/json;charset=utf-8"
 */
const EncodeJsonMiddleware = () => ({
  prepareRequest(next) {
    return next().then((request) => {
      try {
        const body = request.body()
        const contentType = request.header('content-type')

        if (body) {
          const shouldEncodeBody =
            contentType == null || (isJson(contentType) && !alreadyEncoded(body))
          const encodedBody = shouldEncodeBody ? JSON.stringify(body) : body

          return request.enhance({
            headers: { 'content-type': contentType == null ? CONTENT_TYPE_JSON : contentType },
            body: encodedBody,
          })
        }
      } catch (e) {} // eslint-disable-line no-empty
      return request
    })
  },
})

export default EncodeJsonMiddleware
