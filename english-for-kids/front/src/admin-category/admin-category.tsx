import React, { useState } from "react";
import "./admin-category.scss";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import useHttp from "../hooks/http.hook";
import { fetchCards } from "../redux/actions";

const connector = connect(null, { update: fetchCards });
type PropsFromRedux= { info: { _id:string, name: string, words: [] } } & ConnectedProps<typeof connector>

function AdminCategory({ info, update }:PropsFromRedux): React.ReactElement {
  const { request } = useHttp();
  const [create, setCreate] = useState("");
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(info);
  const handleDelete = async () => {
    // eslint-disable-next-line no-underscore-dangle
    await request(`/api/category/${info._id}`, "DELETE");
    update();
  };
  const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setCreate(event.target.value);
  };
  const clickHandler = async () => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const { result } = await request(`/api/category/${info._id}`, "PUT", { name: create });
      setData(result);
      setOpen(false);
      setCreate("");
      update();
    } catch (e) {
      console.log(e.message);
    }
  };
  return (<div className={"admin-category-card"}>
    { !open ? <div className={"admin-category-card-container"}>
      <img onClick={handleDelete} src="/images/delete.png" alt="crest"/>
      <div className={"admin-category-card-head"}>
        <h3> {data.name}</h3>
      </div>
      <div className={"admin-category-card-body"}>
        <h2>Words: {data.words.length} </h2>
      </div>
      <div className={"admin-category-card-footer"}>
        <button onClick={() => setOpen(true)}> Update</button>
        <Link to={`/${info.name}/words`}> Add Word</Link>
      </div>
    </div>
      : <div className={"create-container"}>
          <div className={"label-input"}>
            <label htmlFor={"cat-name"}>Category name</label>
            <input onChange={changeHandler} value={create} type={"text"} id={"cat-name"} name={"category"}/>
          </div>
          <div className={"button-container"}>
            <button className={"cancel-cat"} type={"button"} onClick={() => setOpen(false)}> Cancel </button>
            <button className={"create-cat"} type={"button"} onClick={() => clickHandler()}> Create </button>
          </div>
        </div>}

  </div>);
}

export default connector(AdminCategory);
