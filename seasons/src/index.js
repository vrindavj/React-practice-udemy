import React from "react";
import ReactDOM from "react-dom/client";
import SeasonDisplay from "./SeasonDisplay";
import Spinner from "./Spinner";
import './style/App.css'
class App extends React.Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = { lat: null, errorMsg: "" }; // ONLY TIME when state is directly assigned
  //   }
  state = { lat: null, errorMsg: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        //ALWAYS USE setState to assign new value
        this.setState({ lat: position.coords.latitude });
      },
      (error) => {
        this.setState({ errorMsg: error.message });
      }
    );
  }
  renderHelperFn() {
    if (!this.state.errorMsg && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />;
    }
    if (this.state.errorMsg && !this.state.lat) {
      return <div>Note: {this.state.errorMsg} </div>;
    }
    return <Spinner message="Please accept location request" />;
  }

  render() {
    return <div className="dummyClass">{this.renderHelperFn()}</div>;
  }
}

// ReactDOM.render(<App/>, document.querySelector('#root'))
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
