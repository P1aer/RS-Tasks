import React, { useContext, useState } from "react";
import "./modal.scss";
import useHttp from "../hooks/http.hook";
import context from "../context";

type Props = {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ active, setActive }:Props):React.ReactElement => {
  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    login: "", password: "",
  });
  const auth = useContext(context);
  const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
      setActive(false);
    } catch (e) { console.log(e.message); }
  };
  return (
        <div className={active ? "modal active" : "modal" } onClick={() => setActive(false)}>
            <form onSubmit={(event) => {
              event.preventDefault();
              loginHandler();
            }}
                  className="modal-content" onClick={(event) => event.stopPropagation()}>
                <div className={"form-header"}>
                    <h4> Log in</h4>
                </div>
                <div className={"form-body"}>
                    <label htmlFor="log" > log in</label>
                    <input value={form.login} onChange={changeHandler} id={"log"} type="text" name="login" required/>
                    <label htmlFor="pass"> password</label>
                    <input value={form.password}
                           onChange={changeHandler} id={"pass"} type="password" name="password" minLength={3} required/>
                </div>
                <div className={"form-footer"}>
                    <button className={"cancel"} onClick={() => setActive(false)}> Cancel </button>
                    <button disabled={loading} type={"submit"} className={"apply"}>  Login </button>
                </div>
            </form>
        </div>);
};

export default Modal;
