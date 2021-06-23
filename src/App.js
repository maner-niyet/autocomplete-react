import { Component } from "react";
import axios from "axios";
import "./styles.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      input: "",
      showText: [],
      placeholder: ""
    };
  }
  componentDidMount() {
    console.log("component did mount");
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      const countries = res.data.map((d) => d.name.toLowerCase());
      this.setState({ countries });
    });
  }
  autocomplete = () => {
    const { input, countries } = this.state;
    const i = countries.filter((name) => name.includes(input));
    input.length > 0
      ? this.setState({ showText: i })
      : this.setState({ showText: [] });
  };
  onChange = (e) => {
    let input = e.target.value.toLowerCase();
    this.setState({ input }, () => {
      this.autocomplete();
    });
  };
  complatePlaceHolder = () => {
    if (this.showText.length > 0) {
      let n = this.showText.reduce((accum, item) => {
        if (item.includes(this.state.input)) {
          accum = item;
        }
        return accum;
      }, "");
      this.setState({ placeholder: n });
    } else {
      this.setState({ placeholder: "" });
    }
  };
  clickHandler = (text) => {
    this.setState({ input: text, showText: [] });
  };
  render = () => {
    const { input, showText, placeholder } = this.state;
    console.log(showText);
    return (
      <div className="App">
        <div className="search">
          <p>Search:</p>
          <input
            type="text"
            value={input}
            onChange={this.onChange}
            placeholder={placeholder}
          />
          <ul>
            {input.length > 0
              ? showText.map((text) => (
                  <li
                    onClick={() => {
                      this.clickHandler(text);
                    }}
                  >
                    {text}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    );
  };
}

export default App;
