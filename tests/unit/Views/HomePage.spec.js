import { shallowMount } from '@vue/test-utils'
import HomePage from '../../../src/Views/HomePage'
import { getAllShows } from '../../../src/Services/ApiCalls'
import flushPromises from 'flush-promises'

jest.mock('../../../src/Services/ApiCalls')

describe('Testing HomePage Component ', () => {
  let wrapper

  it('should render proper content on successful page load', async () => {
    const shows = {
      data: [
        {
          id: 2,
          name: 'Under the Dome',
          rating: { average: 6.6 },
          image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg' },
          genres: ['Drama', 'Science-Fiction', 'Thriller']
        }
      ]
    }

    getAllShows.mockResolvedValue(shows)
    wrapper = shallowMount(HomePage)
    await flushPromises()
    expect(wrapper.vm.shows).toEqual(shows.data)
    expect(wrapper.findAll('Card-stub')).toHaveLength(4)
  })

  it('should render proper content on unsuccessful (Error) page load', async () => {
    getAllShows.mockRejectedValue(new Error('Network Error'))
    wrapper = shallowMount(HomePage)
    await flushPromises()
    expect(wrapper.vm.error).toBe('Network Error')
    expect(wrapper.html()).toContain('<errorpage-stub error="Network Error"></errorpage-stub>')
  })
})
