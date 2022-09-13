import { shallowMount } from '@vue/test-utils'
import SearchForShows from '../../../src/Views/SearchForShows.vue'
import { searchForShows } from '../../../src/Services/ApiCalls'
import flushPromises from 'flush-promises'

jest.mock('../../../src/Services/ApiCalls')

describe('Testing SearchForShows Component for successful page load', () => {
  let wrapper
  const shows = {
    data: [{
      show: {
        id: 2,
        name: 'Batman',
        image: { medium: 'https://static.tvmaze.com/202627.jpg' }
      }
    },
    {
      show: {
        id: 93,
        name: 'Batman-2',
        image: { medium: 'https://static.tvmaze.com/202627.jpg' }
      }
    },
    {
      show: {
        id: 115,
        name: 'Batman-3'
      }
    }]
  }

  beforeEach(() => {
    searchForShows.mockResolvedValue(shows)
    wrapper = shallowMount(SearchForShows)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should render proper content on successful page load', async () => {
    await flushPromises()
    expect(wrapper.vm.shows[0]).toEqual(shows.data[0])
    expect(wrapper.findAll('Card-stub')).toHaveLength(2)
  })

  it('to check loaders are working Properly or not', async () => {
    await wrapper.setData({ loading: true })
    expect(wrapper.html()).toContain('Loading')
  })
})

describe('In SearchForShows Component for Unsuccessful page load(Error)', () => {
  let wrapper

  beforeEach(() => {
    searchForShows.mockRejectedValue(new Error('Network Error'))
    wrapper = shallowMount(SearchForShows)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should render Error component on Unsuccessful page load(Error)', async () => {
    await flushPromises()
    expect(wrapper.vm.error).toBe('Network Error')
    expect(wrapper.html()).toContain('<errorpage-stub error="Network Error">')
  })
})
