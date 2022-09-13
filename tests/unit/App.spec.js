import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import app from '../../src/App.vue'

describe('Testing App Component', () => {
  let appWrapper
  const router = new VueRouter({ path: '/', name: 'Home' })

  beforeEach(() => {
    const localVue = createLocalVue()
    localVue.use(VueRouter)
    appWrapper = shallowMount(app, {
      localVue,
      router
    })
  })

  afterEach(() => {
    appWrapper.destroy()
  })

  describe('it should load NavBar component', () => {
    it('is a vue instance', () => {
      expect(appWrapper.isVueInstance).toBeTruthy()
    })

    it('it should have navigationbar-stub', () => {
      expect(appWrapper.html()).toContain('<navigationbar-stub>')
    })

    it('it should have stubed router-view', () => {
      expect(appWrapper.html()).toContain('<router-view-stub name="default">')
    })
  })
})
