import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

export default function FormUpdate() {
    const navigate = useNavigate()
    const param = useParams()
    const [tour, setTour] = useState({})
    const [tourGuide, setTourGuide] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8000/tours/${param.id}`).then((response) => {
            setTour(response.data)
        })
        axios.get('http://localhost:8000/tour-guide').then((response) => {
            setTourGuide(response.data)
        })
    }, [])

    const Validation = Yup.object().shape({
        title: Yup.string().required("Required!").min(3, "Too short!"),
        price: Yup.number().required("Required!").min(0, "Not price!")
            .max(20000000, "Too expensive!")
    })

    return (
        <>
            <div className={'container'}>
                <h1>Update tour</h1>
                <Formik
                    initialValues={{
                        title: tour.title,
                        price: tour.price,
                        description: tour.description,
                        tourGuide: tour.tourGuide
                    }}
                    onSubmit={(values) => {
                        save(values)
                    }}
                    validationSchema={Validation}
                    enableReinitialize={true}>
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <Field type="text" name={'title'} className="form-control" id="title"/>
                            <ErrorMessage name={'title'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Price</label>
                            <Field type="text" name={'price'} className="form-control" id="price"/>
                            <ErrorMessage name={'price'}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <Field type="text" name={'description'} className="form-control" id="description"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tour-guide" className="form-label">TourGuide</label>
                            <Field as={'select'} name={'tourGuide.id'} className="form-control" id="tour-guide">
                                <option value={''}>-----------</option>
                                {tourGuide.map((item, id) => (
                                    <option key={id} value={item.id}>{item.name}</option>
                                ))}
                            </Field>
                        </div>
                        <div className="mb-3">
                            <button className={'btn btn-primary'}>Update</button>
                            &ensp;
                            <Link className={'btn btn-danger'} to={'/tours'}>Close</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )

    function save(values) {
        axios.put(`http://localhost:8000/tours/${param.id}`, values).then(() => {
            navigate('/tours')
        })
    }
}
