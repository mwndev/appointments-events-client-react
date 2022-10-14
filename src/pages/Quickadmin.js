import React, { useContext, useEffect } from 'react'
import { thisURL } from '../contexts/serverURL'
import { UserContext } from '../contexts/UserContext'
import { authenticateUser } from '../functions'

export default function Quickadmin() {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        if(user.isAdmin) window.open(`https://${thisURL}/admin`, "_self")
        let f = async () => { await authenticateUser({email: 'mwiedermann.b@gmail.com', password: 'aaaaaaaa'}, setUser)}
        f()
        window.open(`https://${thisURL}/admin`, "_self")
    })
  return (
    <>

    </>
  )
}
