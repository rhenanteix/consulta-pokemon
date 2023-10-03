import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import MenuPokeBall from '@/components/atoms/MenuPokeBall'

it('<MenuPokeBall /> tests', () => {
  const { container } = render(<MenuPokeBall />)

  expect(container?.firstChild?.classList.contains('menu')).toBe(true)
  expect(container?.firstChild?.classList.contains('open')).toBe(true)
})