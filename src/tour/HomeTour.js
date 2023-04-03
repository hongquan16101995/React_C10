import {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function HomeTour() {
    const [tours, setTours] = useState([])
    const [search, setSearch] = useState("")
    let INDEX = 0

    useEffect(() => {
        axios.get('http://localhost:8000/tours').then((response) => {
            setTours([...response.data])
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
                        <input type="text" id={'search'}
                               onChange={(e) => setSearch(e.target.value)}
                               // onInput={(e) => searchByName1(e)}
                        /> &nbsp;
                        <button onClick={searchByName} className={'btn btn-primary'}>Search</button>
                    </div>
                </div>
                <table className={'table table-striped text-center'}>
                    <thead>
                    <tr>
                        <th>STT</th>
                        <th>Title</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>TourGuide</th>
                        <th id={'th-description'}>Description</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tours.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>{++INDEX}</td>
                                <td>
                                    <Link to={`/detail/${item.id}`}>{item.title}</Link>
                                </td>
                                <td><img src={item.image} alt=""/></td>
                                <td>{item.price}</td>
                                <td>{item.tourGuide.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    <Link className={'btn btn-success'} to={`/form-update/${item.id}`}>Update</Link>
                                </td>
                                <td>
                                    <button type={"button"} onClick={() => deleteTour(item.id)} className={'btn btn-danger'}>Delete
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
        if (window.confirm("Are you sure?")) {
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

    function searchByName() {
        //xử lý với header của request: định kiểu cho dữ liệu đúng với ý định
        axios.post('http://localhost:8080/customers/search-demo', search,
            {headers: {"Content-Type": "text/json"}}).then((response) => {
            setTours(response.data)
        })

        //sử dụng RequestParam để lấy dữ liệu từ body của đường dẫn dưới dạng key và value
        axios.post(`http://localhost:8080/customers/search-demo?name=${search}`).then((response) => {
            setTours(response.data)
        })

        axios.post('http://localhost:8080/customers/search-demo', `name=${search}`).then((response) => {
            setTours(response.data)
        })

        //chuyển đổi giá trị gửi về thành Object, đón ở BE bằng 1 đối tượng POJO
        //đối tương POJO: là các lớp được tạo nhưng không quản lý bởi Bean
        axios.post('http://localhost:8080/customers/search-demo', {name: search}).then((response) => {
            setTours(response.data)
        })
    }

    function searchByName1(e) {
        let search = e.target.value
        let arr = tours.filter((item) => (item.title.match(search)))
        setTours(arr)
    }
}
