import React, { useEffect, useState } from 'react'
import { getUserFromDbById } from '../../api/calls'

const Profile = () => {

  const [user, setUser] = useState({})

  useEffect(() => {
    getUserFromDbById("651e7d2b5ec5de08c95a460d", setUser)
  }, [])


  return (
    <div>
      <h3>This is your user profile.</h3>
      {/* <h3>Welcome{user.data.name ? `, ${user.data.name}` : null}</h3>
      <p><strong>Email:</strong> {user.data.email}</p>
      <p><strong>Role:</strong> {user.data.role}</p> */}
    </div>
  )
}

export default Profile