 

export const signup = (user) => {
    // console.log(user);

    let url = `${process.env.REACT_APP_API_URL}/signup`;

    return fetch(`${url}`, {

         method: "POST",
         headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
         },
         body: JSON.stringify(user)
    }).then((res) => {
         return res.json();
    }).catch((err) => {
         console.log(err);
    })
}


export const signin = (user) => {
     // console.log(user);

     let url = `${process.env.REACT_APP_API_URL}/signin`;

     return fetch(`${url}`, {

          method: "POST",
          headers: {
               Accept: 'application/json',
               'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
     }).then((res) => {
          return res.json();
     }).catch((err) => {
          console.log(err);
     })
}


export const signout = () => {
     console.log("Signout Fired");

     let url = `${process.env.REACT_APP_API_URL}/signout`;
    
     return fetch(`${url}`, {

          method: "GET",
         
     }).then((res) => {
          return res.json();
     }).catch((err) => {
          console.log(err);
     })
}


// export const Auth = ((data,next)=>{
//      const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
//      setCookie("jwt",123654);

//      res.cookie('jwt', data, { httpOnly: true },{expireIn:'1m'});
//      next();
//      console.log(data);
// })
 