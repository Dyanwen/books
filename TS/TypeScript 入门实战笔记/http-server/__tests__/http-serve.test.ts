import http from 'http'
import HttpServer from '../src/http-serve'

describe('http-serve', () => {
  let server: HttpServer
  beforeEach(() => {
    server = new HttpServer({})
    server.listen(8099)
  })
  afterEach(() => {
    server.close()
  })
  it('should listen port', (done) => {
    http
      .request({
        method: 'GET',
        hostname: 'localhost',
        port: 8099,
      })
      .end(() => {
        done()
      })
  })
})
