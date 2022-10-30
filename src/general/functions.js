import { Temporal } from "@js-temporal/polyfill"
import { backendURL } from "../App"


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
    const res = await fetch(`${backendURL}/user`, {
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

export const temporalDateToNum = (date) => {
    return ( Number(date.year * 10000) + Number(date.month * 100) + Number(date.day) )
}

export const toTemporalDateTime = (legacyDate) => {

    return Temporal.PlainDateTime.from(legacyDate.toJSON().substring(0, 23) + '+00:00')

}

export const timeAsNumber = (plainTime) => {
    return plainTime.hour * 100 + plainTime.minute
}

export const dateSplice = (st, c) => {
    let s = String(st)
    return s.slice(0, -2) + ':' + s.slice(-2)
}

export const authenticateUser = async(dataOBJ, setUser) => {
    console.log('authenticating users')


    const JSONbody = JSON.stringify({
      email: dataOBJ.email,
      password: dataOBJ.password,
    })
  
    const res = await fetch(`${backendURL}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
       },
       body: JSONbody,
    })
    const data = await res.json()


    if(data.authenticated){
      await setUser(data.userData)

      saveUserDataToLocalStorage(data.userData)
    }
  }