import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import AdminHeader from "../admin-page-header/admin-page-head";
import { fetchWords } from "../redux/actions";
import "./admin-page-words.scss";
import useHttp from "../hooks/http.hook";
import AdminWordCard from "../admin-word-card/admin-word-card";

const mapStateToProps = (state:{
  data: { words: { key :{_id: string, word: string, translate:string,
      audio: string, image: string}[]} }}) => ({
  words: state.data.words,
});

const connector = connect(mapStateToProps, { update: fetchWords });
type PropsFromRedux = ConnectedProps<typeof connector>

function madeRow(array:{_id: string, word: string, translate:string,
  audio: string, image: string}[]) {
  const result = [];
  const chunk = 3;
  for (let i = 0, j = array.length; i < j; i += chunk) {
    result.push(array.slice(i, i + chunk));
  }
  return result;
}

function AdminPageWords({ words, update }: PropsFromRedux):React.ReactElement {
  const params:{name: keyof { key :{_id: string, word: string, translate:string,
        audio: string, image: string}[] }} = useParams();
  const { request } = useHttp();
  const [create, setCreate] = useState({
    word: "", translate: "", image: "", audio: "",
  });
  const [open, setOpen] = useState(false);
  const [word, setWords] = useState(words?.[params.name] || []);
  const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setCreate({ ...create, [event.target.name]: event.target.value });
  };
  const imageHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    const file = event.target.files?.[0];
    reader.onload = () => {
      setCreate({ ...create, [event.target.name]: reader.result as string });
    };
    reader.readAsDataURL(file as Blob);
  };
  const clickHandler = async () => {
    try {
      const data = await request(`/api/word/create/${params.name}`, "POST", create);
      setOpen(false);
      setWords([...word, data]);
      update();
      setCreate({
        word: "", translate: "", image: "", audio: "",
      });
    } catch (e) { console.log(e.message); }
  };
  const result = madeRow(words?.[params.name] || []);
  return (<div>
    <AdminHeader words={true}/>
    <h3 className={"category-name"}> Category: <span className={"span"}> {params.name} </span></h3>
    <div className={"admin-category-container"}>
        <InfiniteScroll height={780} next={update} className={"scroll"}
                        hasMore={false} loader={<h3>Loading...</h3>} dataLength={word.length}>
          {result.map((row) => <div className={"row"} key={result.indexOf(row)}>
            {
              row.map((elem) => <AdminWordCard info={elem} key={elem.word}/>)
            }
          </div>)
          }
            <div className={"category-card-create-word"}>
                {!open ? <div className={"create-container"}>
                        <h3>Add new word</h3>
                        <button onClick={() => setOpen(true) } type={"button"} className={"create-cat-button"}>
                            <img src="../images/big-plus.svg" alt=""/>
                        </button>
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
                                <input onChange={imageHandler}
                                       name={"audio"} type={"file"} accept="audio/mp3,audio/*;capture=microphone"/>
                            </div>
                            <div className={"file-div"}>
                                <h4>Image</h4>
                                <input onChange={imageHandler} type={"file"}
                                       name={"image"} accept="image/png, image/gif, image/jpeg"/>
                            </div>
                        </div>
                        <div className={"button-container"}>
                            <button className={"cancel-cat"} type={"button"}
                                    onClick={() => setOpen(false)}> Cancel </button>
                            <button className={"create-cat"} type={"button"}
                                    onClick={() => clickHandler()}> Create </button>
                        </div>
                    </div>}
            </div>
        </InfiniteScroll>

    </div>

  </div>);
}

export default connector(AdminPageWords);
