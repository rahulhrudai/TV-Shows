import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../Views/HomePage'
import ShowDetails from '../Views/ShowDetails'
import PageNotFound from '../Views/PageNotFound'
import ErrorPage from '../Components/ErrorPage'
import SearchForShows from '../Views/SearchForShows'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/ShowDetails/:id',
    name: 'ShowDetails',
    component: ShowDetails,
    props: true
  },
  {
    path: '/SearchForShows/:showName',
    name: 'SearchForShows',
    component: SearchForShows,
    props: true
  },
  {
    path: '/ErrorPage',
    name: 'ErrorPage',
    component: ErrorPage,
    props: true
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
