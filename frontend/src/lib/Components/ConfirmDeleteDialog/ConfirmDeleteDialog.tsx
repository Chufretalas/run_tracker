import { useRef, useState } from "react";
import DefaultDialog from "../DefaultDialog/DefaultDialog";

import styles from "./ConfirmDeleteDialog.module.css"

export default function ConfirmDeleteDialog({ isOpen, onClose, runId }
    : { isOpen: boolean, onClose: (confirmDeletion: boolean, stopAsking: boolean) => void, runId: number }) {

    const inpt = useRef<HTMLInputElement>(null)

    function handleForm(e: any) {
        e.preventDefault()
        onClose(true, inpt.current?.checked || false)
    }

    return (
        <DefaultDialog isOpen={isOpen} onClose={() => onClose(false, false)} title={`Delete run (id: ${runId})`}>
            <div>
                <form onSubmit={handleForm} className={styles.form}>
                    <fieldset className={styles.fieldset}>
                        <label htmlFor="ask_to_delete_checkbox">Not ask again for 2 minutes?</label>
                        <input type="checkbox" name="ask_to_delete_checkbox" id="ask_to_delete_checkbox" ref={inpt} defaultChecked={false} />
                    </fieldset>
                    <button type="submit" className={styles.confirm_button}>Confirm</button>
                </form>
            </div>
        </DefaultDialog>
    )
}