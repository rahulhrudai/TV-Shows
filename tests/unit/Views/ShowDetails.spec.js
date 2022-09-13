import { shallowMount, createLocalVue } from '@vue/test-utils'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import ShowDetails from '../../../src/Views/ShowDetails.vue'
import { getShowDetails } from '../../../src/Services/ApiCalls'
import flushPromises from 'flush-promises'

jest.mock('../../../src/Services/ApiCalls')
const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('Testing ShowDetails components For Succesful Page Load', () => {
  let wrapper
  const show = {
    data: {
      id: 2,
      name: 'Batman',
      summary: '<p>This Emmy winning series is a comic</p>',
      genres: ['Drama', 'Romance'],
      language: 'English',
      rating: { average: 6.6 },
      image: { medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/81/202627.jpg' }
    }
  }
  beforeEach(() => {
    getShowDetails.mockResolvedValue(show)
    wrapper = shallowMount(ShowDetails, {
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should render proper content on successful page load', async () => {
    await flushPromises()
    expect(wrapper.vm.show).toEqual(show.data)
    expect(wrapper.html()).toContain('Batman')
    expect(wrapper.html()).toContain('Drama , Romance')
  })

  it('to check loaders are working Properly or not', async () => {
    await wrapper.setData({ loading: true })
    expect(wrapper.html()).toContain('Loading')
  })

  it("should redirect to new window on 'know more' button click", async () => {
    window.open = jest.fn()
    await wrapper.find('.test-button').trigger('click')
    expect(window.open).toHaveBeenCalled()
  })
})

describe('In ShowDetails Component for Unsuccessful page load', () => {
  let wrapper

  beforeEach(() => {
    getShowDetails.mockRejectedValue(new Error('Network Error'))
    wrapper = shallowMount(ShowDetails, {
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should render Error component on Unsuccessful page load(Error)', async () => {
    await flushPromises()
    expect(wrapper.vm.error).toEqual('Network Error')
    expect(wrapper.html()).toContain('<errorpage-stub error="Network Error">')
  })
})
