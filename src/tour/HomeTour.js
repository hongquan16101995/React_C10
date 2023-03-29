import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

export default function HomeTour() {
    const [tours, setTours] = useState([])
    const navigate = useNavigate()
    let INDEX = 0

    useEffect(() => {
        axios.get('http://localhost:8000/tours').then((response) => {
            setTours(response.data)
        })
    }, [])

    return (
        <>
            <div className={'container'}>
                <h1>List tour</h1>

                <div className={'row'}>
                    <div className={'col-8'}>
                        <Link className={'btn btn-primary'} to={'/form-create'}>Create new tour</Link> &nbsp;
                        <button className={'btn btn-primary'} onClick={sortPrice}>Sort by price</button>
                    </div>
                    <div className={'col-4'}>
                        <input type="text" id={'search'}/> &nbsp;
                        <button className={'btn btn-primary'}>Search</button>
                    </div>
                </div>
                <table className={'table table-striped text-center'}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th id={'th-description'}>Description</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tours.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{++INDEX}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Link className={'btn btn-success'} to={`/form-update/${item.id}`}>Update</Link>
                                </td>
                                <td>
                                    <button onClick={() => deleteTour(item.id)} className={'btn btn-danger'}>Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </>
    )

    function deleteTour(id) {
        if (window.confirm("OK")) {
            axios.delete(`http://localhost:8000/tours/${id}`).then(() => {
                axios.get('http://localhost:8000/tours').then((response) => {
                    setTours(response.data)
                })
            })
        }
    }

    function sortPrice() {
        tours.sort((a, b) => {
            return a.price - b.price
        })
        setTours([...tours])
    }
}
