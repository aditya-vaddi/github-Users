import React from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
// Home page component
export default class Home extends React.Component {
  // render
 // constructor
  constructor(props) {
    super(props);

    // default ui local state
    this.state = {
			backspaceRemoves: true,
			multi: true,
			creatable: false,
    };


  }


	onChange (value) {
		this.setState({
			value: value,
		});
	}
	switchToMulti () {
		this.setState({
			multi: true,
			value: [this.state.value],
		});
	}
	switchToSingle () {
		this.setState({
			multi: false,
			value: this.state.value ? this.state.value[0] : null
		});
	}
	getUsers (input) {
		if (!input) {
			return Promise.resolve({ options: [] });
		}

		return fetch(`https://api.github.com/search/users?q=${input}`)
		.then((response) => response.json())
		.then((json) => {
			return { options: json.items };
		});
	}
	gotoUser (value, event) {
		window.open(value.html_url);
	}
	toggleBackspaceRemoves () {
		this.setState({
			backspaceRemoves: !this.state.backspaceRemoves
		});
	}
	toggleCreatable () {
		this.setState({
			creatable: !this.state.creatable
		});
	}

  // render
  render() {
    console.log("this.props",this.props);
    // pagination
    const {users} = this.props;
		const AsyncComponent = this.state.creatable
			? Select.AsyncCreatable
			: Select.Async;
    // show the list of users
    return (
      <div>
  				<AsyncComponent multi={this.state.multi} value={this.state.value} onChange={this.onChange} onValueClick={this.gotoUser} valueKey="id" labelKey="login" loadOptions={this.getUsers} backspaceRemoves={this.state.backspaceRemoves} />

      </div>
    );
  }
}


// function mapStateToProps(state) {
//   console.log("mapStateToProps", state);
//   return {
//     users: state.users

//     // https://github.com/reactjs/react-router-redux#how-do-i-access-router-state-in-a-container-component
//     // react-router-redux wants you to get the url data by passing the props through a million components instead of
//     // reading it directly from the state, which is basically why you store the url data in the state (to have access to it)
//     //page: Number(state.routing.locationBeforeTransitions.query.page) || 1,
//   };
// }
// export default connect(mapStateToProps)(Home);
