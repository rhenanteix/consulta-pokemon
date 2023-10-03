import { Axios } from 'axios'

import { createInstance } from './instance'

const api: Axios = createInstance('pokeapi')

export const getRegions = async () => {
  return await api.get('/region')
    .then(res => res.data)
}

export const getCities = async (url: string) => {
  const urlSplit = url.split('/')
  const id = urlSplit[urlSplit.length - 2]
  return await api.get(`/region/${id}`)
    .then(res => res.data)
}

export const getPokemons = async () => {
  return await api.get('/pokemon')
    .then(res => res.data)
}