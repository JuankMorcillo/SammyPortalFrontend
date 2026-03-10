import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Forms from '../../app/components/form'

describe('Forms Component', () => {
    it('debe renderizar el formulario con inputs', () => {
        const mockInputs: Inputs = [
            {
                id: 'title',
                label: 'Título',
                type: 'text',
                required: true,
            }
        ]
        const setInfo = vi.fn()

        render(
            <Forms
                styles={{ cols: 1 }}
                data={{}}
                setInfo={setInfo}
                inputs={mockInputs}
                submitting={false}
            />
        )

        expect(screen.getByDisplayValue('')).toBeInTheDocument()
    })

    it('debe enviar el formulario con los valores correctos', async () => {
        const mockInputs: Inputs = [
            {
                id: 'title',
                label: 'Título',
                type: 'text',
                required: true,
            }
        ]
        const setInfo = vi.fn()
        const user = userEvent.setup()

        render(
            <Forms
                styles={{ cols: 1 }}
                data={{ title: '' }}
                setInfo={setInfo}
                inputs={mockInputs}
                submitting={false}
            />
        )

        const input = screen.getByDisplayValue('')
        await user.type(input, 'Mi Título')

        const submitButton = screen.getByRole('button', { name: /submit/i })
        await user.click(submitButton)

        expect(setInfo).toHaveBeenCalled()
    })
})