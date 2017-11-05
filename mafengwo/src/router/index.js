import Vue from 'vue'
import Router from 'vue-router'

import Homepage from '../components/menu/Homepage.vue'
import Destination from '../components/menu/Destination.vue'
import Hotel from '../components/menu/Hotel.vue'
import Travelmall from '../components/menu/Travelmall.vue'
import Mine from '../components/menu/Mine.vue'

import Raiders from '../components/icons/Raiders.vue'
// import Wineshop from '../components/icons/Wineshop.vue'
// import Plane from '../components/icons/Plane.vue'
// import Vacation from '../components/icons/Vacation.vue'
// import Travelnotes from '../components/icons/Travelnotes.vue'
// import Video from '../components/icons/Video.vue'
// import Answer from '../components/icons/Answer.vue'
// import Weng from '../components/icons/Weng.vue'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {path: '/homepage', name: 'homepage', component: Homepage},
    {path: '/destination', name: 'destination', component: Destination},
    {path: '/hotel', name: 'hotel', component: Hotel},
    {path: '/travelmall', name: 'travelmall', component: Travelmall},
    {path: '/mine', name: 'mine', component: Mine},
    {path: '/116', name: 'Raiders', component: Raiders}
  ]
})
