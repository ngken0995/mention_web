import React, { Component, useState, useEffect } from 'react'; 
import { Redirect, useHistory } from 'react-router-dom';
import isAuthenticated from '../lib/isAuthenticated';

function Signup() {
  const [loggedin, setLoggedin] = useState(isAuthenticated());
  const history = useHistory();
  useEffect(() => {
    if(loggedin){
    history.push({
      pathname: '/login'
  });}
  },[loggedin])

  const submit = (e) => {
    e.preventDefault()
    e.stopPropagation()

    let form = e.target
    let formData = new FormData(form)
    let params = new URLSearchParams(formData)

    // Some browsers don’t support
    // "new URLSearchParams(formData)" syntax
    // In which case, please do as follows
    //
    // let param = new URLSearchParams()
    // param.append('username', formData.get('username'))
    // param.append('password', formData.get('password'))
    // param.append('remember', formData.get('remember'))

    // You must need to valide data but I skip in here

    // Send request to the server
    fetch('/api/signup', {
      method: 'POST',
      body: params
    }).then( (res) => {
      return res.json()
    }).then(data => {
      localStorage.setItem('token', data.token)
      setLoggedin(true)
    }).catch( (err) => {
      console.error(err)
    })
  }

  return (
    <div>
    <h1>Signup</h1>
    <form onSubmit={submit}>
      <div>
        <label>Username: </label>
        <input type="text" name="username" pattern=".{2,16}" required />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" name="password" pattern=".{6,20}" required />
      </div>
      <div>
        <input type="submit" value="Sign up" />
      </div>
    </form>
  </div>
  )
}

export default Signup
