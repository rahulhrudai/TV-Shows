import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import PageNotFound from '../../../src/Views/PageNotFound'

describe('In ErrorPage Component', () => {
  let wrapper
  const push = jest.fn()
  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)
    wrapper = shallowMount(PageNotFound, {
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

  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('Should have a h3 tag with crt text', () => {
    expect(wrapper.find('h3').text()).toBe("This Page Doesn't Exist")
  })

  it('test to check weather goToHome method is called when button is clicked', () => {
    wrapper.find('b-button-stub').trigger('click')
    expect(push).toHaveBeenCalledWith('/')
  })
})
