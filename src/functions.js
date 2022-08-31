export const getUserDataFromLocalStorage = (setUser) => {

    let uid = localStorage.getItem('JMUDUYPTID')

    let ufn = localStorage.getItem('JMUDUYPTFN')

    let uln = localStorage.getItem('JMUDUYPTLN')

    let uem = localStorage.getItem('JMUDUYPTEM')

    let pw = localStorage.getItem('JMUDUYPTPW')

    let adm = localStorage.getItem('JMUDUYPTAM')

    setUser({id: uid, firstName: ufn, lastName: uln, email: uem, password: pw, isAdmin: JSON.parse(adm)})
}

export const saveUserDataToLocalStorage = (userData) => {
    console.log(userData)

    localStorage.setItem('JMUDUYPTID', userData.id)

    localStorage.setItem('JMUDUYPTFN', userData.firstName)

    localStorage.setItem('JMUDUYPTLN', userData.lastName)

    localStorage.setItem('JMUDUYPTEM', userData.email)

    localStorage.setItem('JMUDUYPTPW', userData.password)

    localStorage.setItem('JMUDUYPTAM', JSON.stringify(userData.isAdmin))
}


export const saveUserDataToServer = async (user) => {

    const res = await fetch(`http://localhost:5040/user`, {
        method: 'PUT',
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({
            newData: {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            password: user.password,
            id: user.id,
        })
    })
    const jres = await res.json()

    saveUserDataToLocalStorage(user)


}