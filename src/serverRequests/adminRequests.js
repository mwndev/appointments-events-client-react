const serverGetAppointments = async(bodyAsObj) => {
    try {
        const bodyAsJSON = JSON.stringify(bodyAsObj)

        console.log(bodyAsJSON)
        
        const res = await fetch('http://localhost:5040/appointment/test')
        const data = await res.json()

        return data


    } catch (error) {
        console.log(error)
        window.alert('appointments could not be set')
    }
}

const serverPostAppointments = async(bodyAsObj) => {
    try {
        const bodyAsJSON = JSON.stringify(bodyAsObj)

        console.log(bodyAsJSON)
        
        const res = await fetch('http://localhost:5040/appointment/test', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: bodyAsJSON,
        })

        const data = await res.json()

        return data

       
    } catch (error) {
        console.log(error)
    }
}

const serverDeleteAppointments = async(bodyAsObj) => {
    try {
        const bodyAsJSON = JSON.stringify(bodyAsObj)

        console.log(bodyAsJSON)
        
        const res = await fetch('http://localhost:5040/appointment/test', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            body: bodyAsJSON,
        })
        
        const data = await res.json()

        return data

       
    } catch (error) {
        console.log(error)
    }
}

const serverUpdateAppointments = async(bodyAsObj) => {
    try {
        const bodyAsJSON = JSON.stringify(bodyAsObj)

        console.log(bodyAsJSON)
        
        const res = await fetch('http://localhost:5040/appointment/test', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: bodyAsJSON,
        })
        
        const data = await res.json()

        return data

       
    } catch (error) {
        console.log(error)
    }
}

const adminRequests = {serverDeleteAppointments, serverGetAppointments, serverUpdateAppointments, serverPostAppointments}

export default adminRequests