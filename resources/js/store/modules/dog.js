import axios from 'axios'
import { api } from '~/config'
import * as types from '../mutation-types'

/**
 * Initial state
 */
export const state = {
  dog: window.localStorage.getItem('dog')
}

/**
 * Mutations
 */
export const mutations = {

  [types.SET_DOG](state, { dog }) {
    let data = JSON.stringify(dog)
    state.dog = data
    window.localStorage.setItem('dog', data)
  },

}

/**
 * Actions
 */
export const actions = {
  setDog({ commit }, payload) {
    commit(types.SET_DOG, payload)
  },

}

/**
 * Getters
 */
export const getters = {
  dog: state => state.dog,

}
