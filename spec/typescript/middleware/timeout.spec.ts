import forge from 'mappersmith'
import TimeoutMiddleware from 'mappersmith/middleware/timeout'

const Timeout = TimeoutMiddleware(500)

forge({
  middleware: [Timeout],
  clientId: 'github',
  host: 'https://status.github.com',
  resources: {},
})
