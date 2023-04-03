import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "./FirebaseConfig";

export default function FormUpdate() {
    const navigate = useNavigate()
    const param = useParams()
    const [tour, setTour] = useState({})
    const [tourGuide, setTourGuide] = useState([])
    const [image, setImage] = useState("")
    const [progressPercent, setProgressPercent] = useState(0)
    const [check, setCheck] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/tours/${param.id}`).then((response) => {
            setTour(response.data)
            setImage(response.data.image)
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
                        imagePath: tour.imagePath,
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
                            <label htmlFor="image" className="form-label">Image</label>
                            <input type="file" className="form-control" id="image"
                                   onChange={(e) => uploadFile(e)}/>
                        </div>
                        {
                            !image &&
                            <div className='outer-bar'>
                                <div className='inner-bar' style={{width: `${progressPercent}%`}}>{progressPercent}%
                                </div>
                            </div>
                        }
                        {
                            image &&
                            <img src={image} alt='uploaded file'/>
                        }
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
                            <button disabled={check} className={'btn btn-primary'}>Update</button>
                            &ensp;
                            <Link className={'btn btn-danger'} to={'/tours'}>Close</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    )

    function save(values) {
        if (image !== undefined) {
            values.imagePath = image
        }
        console.log(image)
        axios.put(`http://localhost:8000/tours/${param.id}`, values).then(() => {
            navigate('/tours')
        })

    }

    function uploadFile(e) {
        setCheck(true)
        if (e.target.files[0]) {
            const storageRef = ref(storage, `image/${e.target.files[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const progress =
                        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgressPercent(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImage(downloadURL)
                        setCheck(false)
                    });
                }
            );
        }
    }
}
