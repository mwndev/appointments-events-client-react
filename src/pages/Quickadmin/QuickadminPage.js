import React, { useContext, useEffect } from 'react'
import { thisURL } from '../../App'
import { UserContext } from '../../contexts/UserContext'
import { authenticateUser } from '../../general/functions'

export default function Quickadmin() {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        if(user.isAdmin) window.open(`${thisURL}/admin`, "_self")
        let f = async() => {
            await authenticateUser({email: 'mwiedermann.b@gmail.com', password: 'aaaaaaaa'}, setUser)
            window.open(`${thisURL}/admin`, "_self")
        }
        f()
    })
  return (
    <>

    </>
  )
}
