import * as types from '../mutations-types'

const state = {
  offset: []
}

const getters = {}

const mutations = {
  [types.LIST_TRANSLATE] (state, ul) {
    let move = Math.abs(state.offset[state.offset.length - 1] - state.offset[0])
    let slide = state.offset[state.offset.length - 1] - state.offset[0]
    ul.style.transition = 'all 0.5s'
    let index = parseInt(ul.getAttribute('index'))
    if (move > 100) {
      if (slide < 0) {
        console.log('向左')
        if (index > -4) {
          index--
          // console.log(state.index)
        }
        ul.style.transform = 'translateX(' + index * 344.25 + 'px)'
      }
      // 向右
      if (slide > 0) {
        console.log('向右')
        if (index < 0) {
          index++
          // console.log(state.index)
        }
        ul.style.transform = 'translateX(' + index * 345 + 'px)'
      }
    }
    ul.setAttribute('index', index)
    // console.log(parseInt(ul.getAttribute('index')))
    state.offset = []
  },
  [types.GET_OFFSET] (state, e) {
    state.offset.push(e.changedTouches[0].clientX)
  },
  [types.SET_INDEX] (state, ul) {
    for (let i = 0; i < ul.length; i++) {
      ul[i].setAttribute('index', 0)
      // console.log(parseInt(ul[i].getAttribute('index')))
    }
  }
}

export default {
  state,
  getters,
  mutations
}
