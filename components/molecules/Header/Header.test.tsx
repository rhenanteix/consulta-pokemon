import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Header from '.'

jest.mock('next/router', () => require('next-router-mock'))

it('<Header /> tests', () => {
  const {
    container
  } = render(<Header />)

  expect(container).toMatchSnapshot()
})