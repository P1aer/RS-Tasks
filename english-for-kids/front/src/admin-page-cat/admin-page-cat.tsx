import React, { useState } from "react";
import "./admin-page-cat.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, ConnectedProps } from "react-redux";
import AdminHeader from "../admin-page-header/admin-page-head";
import useHttp from "../hooks/http.hook";
import { fetchCards } from "../redux/actions";
import AdminCategory from "../admin-category/admin-category";

const mapStateToProps = (state:{
  data: { cards: {_id: string, name: string, words: [] }[] }}) => ({
  categories: state.data.cards,
});

const connector = connect(mapStateToProps, { update: fetchCards });
type PropsFromRedux = ConnectedProps<typeof connector>

function madeRow(array:{ _id: string; name: string; words: [];}[]) {
  const result = [];
  const chunk = 3;
  for (let i = 0, j = array.length; i < j; i += chunk) {
    result.push(array.slice(i, i + chunk));
  }
  return result;
}

function AdminPageCategories({ categories, update }:PropsFromRedux): React.ReactElement {
  const { request } = useHttp();
  const [create, setCreate] = useState("");
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(categories);
  const changeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setCreate(event.target.value);
  };
  const clickHandler = async () => {
    try {
      const data = await request("/api/category/create", "POST", { name: create });
      setOpen(false);
      setCategory([...category, data]);
      update();
      setCreate("");
    } catch (e) { console.log(e.message); }
  };
  const result = madeRow(categories);
  return (<div>
    <AdminHeader/>
    <div className={"admin-category-container"}>
        <InfiniteScroll height={780} next={update} className={"scroll "}
                        hasMore={false} loader={<h3>Loading...</h3>} dataLength={categories.length}>
          {result.map((row) => <div className={"row"} key={result.indexOf(row)}>
              {
                row.map((cat) => <AdminCategory info={{ ...cat }} key={cat.name}/>)
              }
            </div>)
           }
          <div className={"category-card-create"}>
            {!open ? <div className={"create-container"}>
                    <h3>Create new Category</h3>
                    <button onClick={() => setOpen(true) } type={"button"} className={"create-cat-button"}>
                        <img src="images/plus.svg" alt=""/>
                    </button>
                </div>
              : <div className={"create-container"}>
                    <div className={"label-input"}>
                        <label htmlFor={"cat-name"}>Category name</label>
                        <input onChange={changeHandler} value={create} type={"text"} id={"cat-name"} name={"category"}/>
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

export default connector(AdminPageCategories);
