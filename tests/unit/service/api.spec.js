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
      response: {
        id: 1,
        owners: [
          { name: 'Test Owner', address: '123 Test St.', ssn: '123-12-1234', ownership_percentage: 100 }
        ]
      }
    })
    api
      .get('https://api.tvmaze.com')
      .then(res => expect(res.owners).not.toBe(null))
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
        expect(error.response).not.toBe(null)
      })
      .finally(done)
  })
})
