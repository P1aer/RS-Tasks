import React from "react";
import "./modal.scss";

type Props = {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ active, setActive }:Props):React.ReactElement => (
    <div className={active ? "modal active" : "modal" } onClick={() => setActive(false)}>
        <form onSubmit={(event) => event.preventDefault()}
              className="modal-content" onClick={(event) => event.stopPropagation()}>
            <div className={"form-header"}>
                <h4> Log in</h4>
            </div>
            <div className={"form-body"}>
                <label htmlFor="#log"> log in</label>
                <input id={"log"}/>
                <label htmlFor="#pass"> password</label>
                <input id={"pass"} type="password" />
            </div>
            <div className={"form-footer"}>
                <button className={"cancel"} onClick={() => setActive(false)}> Cancel </button>
                <button type={"submit"} className={"apply"}>  Login </button>
            </div>
        </form>
    </div>);

export default Modal;
