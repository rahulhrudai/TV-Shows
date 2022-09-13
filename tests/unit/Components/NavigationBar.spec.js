import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import NavigationBar from '../../../src/Components/NavigationBar.vue'
import { routes } from '../../../src/Router/Index.js'

describe('Testing NavigationBar Component', () => {
  let wrapper
  const router = new VueRouter({ routes })

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)
    localVue.use(VueRouter)
    wrapper = shallowMount(NavigationBar, {
      localVue,
      router
    })
    wrapper.vm.$router.push = jest.fn(() => Promise.resolve())
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('test to check if it renders the correct markup', () => {
    const expected = '<b-navbar-stub tag="nav" toggleable="sm" type="dark" variant="info">'
    expect(wrapper.html()).toContain(expected)
  })

  it('it should have a <b-navbar-brand> element', () => {
    expect(wrapper.find('b-navbar-brand-stub')).toBeTruthy()
  })

  it('Should render correct component when searched for tv shows', async () => {
    await wrapper.find('input').setValue('girls')
    await wrapper.find('b-button-stub').trigger('click')
    expect(wrapper.vm.$router.push).toHaveBeenCalledWith({ name: 'SearchForShows', params: { showName: 'girls' } })
  })

  it('Should render correct component when searched for Navigation duplication error', async () => {
    wrapper.vm.$router.push.mockReturnValueOnce(Promise.reject(new Error('Network Error'))).mockReturnValueOnce(Promise.resolve())

    await wrapper.find('input').setValue('girls')
    await wrapper.find('b-button-stub').trigger('click')

    expect(wrapper.vm.$router.push).toHaveBeenLastCalledWith({ name: 'ErrorPage', params: { error: 'Dont search For Same Show.Search Something Different' } })
  })
})
