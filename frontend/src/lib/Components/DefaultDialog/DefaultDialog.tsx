import { useEffect, useRef } from "react"
import styles from "./DefaultDialog.module.css"

export default function DefaultDialog({ children, isOpen, onClose, title = "" }
    : { children: React.ReactNode, isOpen: boolean, onClose: () => void, title: string }) {

    const ref = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        if (isOpen) {
            ref.current?.showModal()
        } else {
            ref.current?.close()
        }
    }, [isOpen])

    return (
        <dialog ref={ref} className={styles.dialog}>
            <div className={styles.dialog_header}>
                <button onClick={() => {
                    onClose()
                    ref.current?.close()
                }}
                    className={styles.close_button}>X</button>
                <span>{title}</span>
            </div>
            {children}
        </dialog>
    )
}