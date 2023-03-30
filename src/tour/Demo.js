import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function Demo() {

    const [value, setValue] = useState('abc')
    const navigate = useNavigate()

    useEffect(() => {
        // axios.get('http://192.168.0.239:8080/employee/11').then((response) => {
        //     setValue(response.data)
        // }).catch(() => {
        //     navigate("/error")
        // })
    }, [])

    let getBranch = function () {
        return new Promise((resolve, reject) => {
            axios.get('http://192.168.0.239:8080/employee/b/1').then((res) => {
                resolve(res.data)
            }).catch(() => {
                reject("aaa")
            })
        })
    }

    let getEmploy = function (branch) {
        return new Promise((resolve, reject) => {
            axios.post('http://192.168.0.239:8080/employee/b', branch).then((res) => {
                resolve(res.data)
            }).catch(() => {
                reject("aaa")
            })
        })
    }

    async function m1() {
        let b = await getBranch()
        let e = await getEmploy(b)
        console.log(b)
        console.log(e)
    }

    function m2() {
        getBranch().then((res) => {
            getEmploy(res).then((res) => {
                console.log(res)
            })
        })
    }

    return (
        <>
            <h1>{value}</h1>
            <button onClick={m1}>Demo1</button>
            <button onClick={m2}>Demo2</button>
        </>
    )
}
