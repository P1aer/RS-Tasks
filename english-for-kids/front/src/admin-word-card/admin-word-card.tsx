import React, { useState } from "react";
import "./admin-word-card.scss";
import { connect, ConnectedProps } from "react-redux";
import { fetchWords } from "../redux/actions";
import useHttp from "../hooks/http.hook";

const connector = connect(null, { update: fetchWords });
type PropsFromRedux= { info: {_id: string, word: string, translate:string,
        audio: string, image: string} } & ConnectedProps<typeof connector>

function AdminWordCard({ info, update }:PropsFromRedux):React.ReactElement {
  const { request } = useHttp();
  const [create, setCreate] = useState({
    word: info.word, translate: info.translate, image: info.image, audio: info.audio,
  });
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(info);
  const audio = new Audio(data.audio);
  const handleDelete = async () => {
    // eslint-disable-next-line no-underscore-dangle
    await request(`/api/word/${info._id}`, "DELETE");
    update();
  };
  const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setCreate({ ...create, [event.target.name]: event.target.value });
  };
  const clickHandler = async () => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const { result } = await request(`/api/word/update/${info._id}`, "PUT", create);
      setData(result);
      setOpen(false);
      setCreate({
        word: result.word, translate: result.translate, image: result.image, audio: result.audio,
      });
      update();
    } catch (e) {
      console.log(e.message);
    }
  };
  const fileHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    reader.onload = () => {
      setCreate({ ...create, [event.target.name]: reader.result as string });
    };
    reader.readAsDataURL(file as Blob);
  };
  return (<div className={"admin-word-card"}>
      { !open ? <div className={"admin-word-card-container"}>
              <img className={"crest-img"}
                   onClick={handleDelete} src="/images/delete.png" alt="crest"/>
              <div className={"admin-word-card-body"}>
                <h3><span>Word</span> : {data.word}</h3>
                <h3><span>Translation</span> : {data.translate}</h3>
                <h3><span>Sound</span> : {data.word}.mp3</h3>
                <h3><span>Image</span></h3>
                <img onClick={() => audio.play()} src={data.image} alt="card image"/>
              </div>
              <div className={"admin-word-card-footer"}>
                  <button onClick={() => setOpen(true)}> Change</button>
              </div>
          </div>
        : <div className={"create-container"}>
              <div className={"label-input"}>
                  <label htmlFor={"cat-name"}>Word</label>
                  <input onChange={changeHandler} value={create.word}
                         type={"text"} id={"cat-name"} name={"word"}/>
                  <label htmlFor={"cat-name"}>Translate</label>
                  <input onChange={changeHandler} value={create.translate}
                         type={"text"} id={"cat-name"} name={"translate"}/>
                  <div className={"file-div"}>
                      <h4>Sound</h4>
                      <input onChange={fileHandler}
                             name={"audio"} type={"file"} accept="audio/mp3,audio/*;capture=microphone"/>
                  </div>
                  <div className={"file-div"}>
                      <h4>Image</h4>
                      <input onChange={fileHandler} type={"file"}
                             name={"image"} accept="image/png, image/gif, image/jpeg"/>
                  </div>
              </div>
              <div className={"button-container"}>
                  <button className={"cancel-cat"} type={"button"}
                          onClick={() => setOpen(false)}> Cancel </button>
                  <button onClick={clickHandler} className={"create-cat"} type={"button"}> Create </button>
              </div>
          </div>}
  </div>);
}

export default connector(AdminWordCard);
