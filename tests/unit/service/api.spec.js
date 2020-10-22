import moxios from 'moxios'
import api from '@/api'

describe('api.js', () => {
  beforeEach(() => {
    moxios.install(api)
  })
  afterEach(() => {
    moxios.uninstall(api)
  })
  it('should get a good response with 200 OK', done => {
    moxios.stubRequest('https://api.tvmaze.com', {
      status: 200,
      responseText: 'positive flow'
    })
    api
      .get('https://api.tvmaze.com')
      .then(res => expect(res.status).toBe(200))
      .finally(done)
  })

  it('should get a bad response with 404 status', done => {
    moxios.stubRequest('https://api.tvmaze.com', {
      status: 404,
      response: {
        response: {
          status: 404
        }
      }
    })
    api
      .get('https://api.tvmaze.com')
      .catch(error => {
        expect(error.response.status).toBe(404)
      })
      .finally(done)
  })
})
