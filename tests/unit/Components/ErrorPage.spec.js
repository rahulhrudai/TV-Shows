import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import errorpage from '../../../src/Components/ErrorPage.vue'

describe('Testing ErrorPage Component', () => {
  let wrapper
  const push = jest.fn()
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)
    wrapper = shallowMount(errorpage, {
      localVue,
      mocks: {
        $router: {
          push
        }
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('Should go render correct component when goToHome button is clicked', () => {
    wrapper.find('b-button-stub').trigger('click')
    expect(push).toHaveBeenCalledWith('/')
  })
})
