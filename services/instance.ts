import axios from 'axios'

export function createInstance(instanceName: string) {
	const URLInstances: any = {
		schedule: 'http://localhost:3000/api/scheduling/',
		pokeapi: 'https://pokeapi.co/api/v2/'
	}

	return axios.create({
		baseURL: URLInstances[instanceName]
	})
}
