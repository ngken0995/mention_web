import React, { Component, useEffect, useState } from 'react';

function Home() {
  const [user, setUser] = useState('')
  const [keyword, setKeyword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchData() {
      // Call fetch as usual
      const res = await fetch('http://localhost:5000/api/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }});

      // Pull out the data as usual
      const json = await res.json();
      

      // Save the posts into state
      setUser(json.username);
    }

    fetchData();
  });
  /*
  useEffect(() => {
    fetch('http://localhost:5000/api/user', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }).then(res => {
      return res.json()
    }).then(user => {
      setUser({user: user})
    }).catch( err => {
      console.log(err)
    })
  },[]);
  */
  const submit = (e) => {
    e.preventDefault()
    e.stopPropagation()

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

  }


  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to Home {user}</p>
      <form onSubmit={submit}>
          <div>
            <label>keyword: </label>
            <input type="text" name="keyword" pattern=".{2,16}" required 
            value={keyword} onChange = {e => setKeyword(e.target.value)} />
          </div>
          <div>
            <label>Password: </label>
            <input type="email" name="password" pattern=".{6,20}" required
            value={email} onChange = {e => setEmail(e.target.value)}/>
          </div>
            <div>
              <input type="submit" value="save" />
            </div>
      </form>
    </div>
  )
}

export default Home