import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Step from '.'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')

it('<Step /> tests', () => {
  const props = {
    actualStepName: 'Quem Somos',
    title: 'Quem Somos',
    slogan: 'A maior rede de tratamento pokémon.',
    router: 'quem-somos'
  }
  useRouter.mockImplementation()

  const {
    getAllByText
  } = render(
    <Step { ...props } />
  )

  expect(getAllByText(/Quem Somos|quem-somos/)).toBeTruthy()
  expect(getAllByText('A maior rede de tratamento pokémon.')).toBeTruthy()
})