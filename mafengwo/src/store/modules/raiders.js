import * as types from '../mutations-types'

const state = {}

const mutations = {
  [types.GET_INDEX] (state, {index, content}) {
    for (let i = 0; i < content.length; i++) {
      console.log(content[i].style.display)
      content[i].setAttribute('style', 'transition: all 0.5s;-moz-transition: all 0.5s;-webkit-transition: all 0.5s;-o-transition:all 0.5s;')
      content[i].style.opacity = 0
      content[i].style.left = 375 + 'px'
    }
    content[index].style.left = 0
    content[index].style.opacity = 1
  }
}

export default {
  state,
  mutations
}
