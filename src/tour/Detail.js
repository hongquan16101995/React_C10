import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

export default function Detail() {

    const param = useParams()
    const [tour, setTour] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/tours/${param.id}`).then((response) => {
            setTour(response.data)
            console.log(response.data)
        })
    }, [])

    return (
        <>
            <h3>Id: {tour.id}</h3>
            <h3>Title: {tour.title}</h3>
            <h3>Price: {tour.price}</h3>
            <h3>Description: {tour.description}</h3>
            <h3>TourGuide : {tour.tourGuide?.name}</h3>
        </>
    )
}
