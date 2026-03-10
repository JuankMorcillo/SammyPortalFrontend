import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from '../../app/components/modal'


describe('Modal Component', () => {
    it('debe mostrar el modal cuando open es true', () => {
        const setOpen = vi.fn()
        render(
            <Modal open={true} setOpen={setOpen} title="Test Modal">
                <p>Contenido del modal</p>
            </Modal>
        )

        expect(screen.getByText('Test Modal')).toBeInTheDocument()
        expect(screen.getByText('Contenido del modal')).toBeInTheDocument()
    })

    it('debe cerrar el modal al hacer click en el botón X', async () => {
        const setOpen = vi.fn()
        const user = userEvent.setup()

        render(
            <Modal open={true} setOpen={setOpen} title="Test Modal" x_icon={true}>
                <p>Contenido</p>
            </Modal>
        )

        const closeButton = screen.getByRole('button')
        await user.click(closeButton)

        expect(setOpen).toHaveBeenCalledWith(false)
    })
})