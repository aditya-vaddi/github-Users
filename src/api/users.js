// API Users static class
export default class ApiUsers {
  // get a list of users
  static getList() {
		return fetch(`https://api.github.com/search/users?q=ad`)
		.then((response) => response.json())
		.then((json) => {
      console.log("json in api",json);
			return { options: json.items };
		});
  }

  // // add/edit a user
  // static addEdit() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       // do something here
  //       resolve();
  //     }, 1000);
  //   });
  // }

  // // delete a user
  // static delete() {
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       // do something here
  //       resolve();
  //     }, 500);
  //   });
  // }
}
