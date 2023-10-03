import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Button from './index'

it('Should render Button', () => {
  const handleFc = jest.fn()
  const { getByText } = render(<Button textLabel='Agendar consulta' onClickEvent={handleFc} />)

  expect(getByText('Agendar consulta')).toBeTruthy()

  fireEvent.click(getByText('Agendar consulta'))
  expect(handleFc).toHaveBeenCalledTimes(1)

  expect(Button).toContainHTML
})