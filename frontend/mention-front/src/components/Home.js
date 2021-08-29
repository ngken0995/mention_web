import React, { Component, useEffect, useState } from 'react'

function Home() {
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchData() {
      // Call fetch as usual
      const res = await     fetch('http://localhost:5000/api/user', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }});

      // Pull out the data as usual
      const json = await res.json();

      // Save the posts into state
      // (look at the Network tab to see why the path is like this)
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

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to Home.{user}</p>
    </div>
  )
}

export default Home