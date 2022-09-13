import { searchForShows, getAllShows, getShowDetails } from '../../../src/Services/ApiCalls'
import axios from 'axios'

jest.mock('axios')
describe('In ApiCalls file', () => {
  it('tests getAllShows method', async () => {
    axios.get = jest.fn()
    const mockedResponse = [
      {
        id: 2,
        name: 'Batman',
        image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg' }
      },
      {
        id: 93,
        name: 'Batman-2',
        image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg' }
      }
    ]

    axios.get.mockResolvedValue(mockedResponse)
    await getAllShows().then((result) => {
      expect(result).toBe(mockedResponse)
    })
  })

  it('tests getShowDetails method', async () => {
    axios.get = jest.fn()
    const mockedResponse = [
      {
        id: 2,
        name: 'Batman',
        image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg' }
      }]
    axios.get.mockResolvedValue(mockedResponse)

    await getShowDetails(2).then((result) => {
      expect(result).toBe(mockedResponse)
    })
  })

  it('test  searchForShows method', async () => {
    axios.get = jest.fn()
    const mockedResponse = [
      {
        id: 2,
        name: 'Batman',
        image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg' }
      }]
    axios.get.mockResolvedValue(mockedResponse)

    await searchForShows('Batman').then((result) => {
      expect(result).toBe(mockedResponse)
    })
  })
})
