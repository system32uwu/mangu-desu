import * as React from "react";
import axios from "axios";
//import { Home as MgdxHome } from "mangadex-full-api";

//listado de mangas

//filtrar por: newest, top6h, top24h,top7d,topFollows,topRating.

interface IProps {}

interface IState {}

//let home = new MgdxHome(true);

class Home extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/api")
      .then((data) => console.log(JSON.stringify(data)))
      .catch((err) => console.log(err));
  }

  render() {
    return <div></div>;
  }
}

export default Home;
