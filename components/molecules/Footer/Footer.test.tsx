import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Footer from '@/components/molecules/Footer'

it('<Footer /> tests', () => {
  const {
    getByText
  } = render(<Footer />)

  expect(getByText('Todas as marcas e ilustrações utilizadas são de seus resepctivos donos.')).toBeTruthy()
})