let UserFactory = function ($auth, Restangular) {
  "ngInject";
  const user = {};

  let getUser = () => {
    return user;
  };

  let isSignedIn = () => {
    return user.isSignedIn; 
  };

  let login = (username, password) => {
    $auth.login({_username: username, _password: password}, {
          transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
              str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
          },
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function(response) {
      console.log(response);
      console.log($auth.getPayload()['user_id']);
      $auth.setToken(response.data.token);
      Restangular.setDefaultHeaders({Authorization: 'Bearer ' + response.data.token});
      console.log( Restangular.one('users', $auth.getPayload()['user_id']).getList());
    }).catch(function(response) {

    });
  };

  return { getUser, isSignedIn, login };
};

export default UserFactory;