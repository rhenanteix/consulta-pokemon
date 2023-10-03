import { Axios, AxiosResponse } from 'axios'

import { createInstance } from './instance'

const api: Axios = createInstance('schedule')

export const getDateSchedule = async () => {
  return await api.get('/date').then((res: AxiosResponse) => res.data)
}

export const getTimeSchedule = async (date: string) => {
  return await api.post('/time', {
    date
  })
  .then((res: AxiosResponse) => res.data)
}