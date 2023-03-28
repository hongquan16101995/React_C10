import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup'

export default function FormProduct(props) {

    const Validation = Yup.object().shape({
        name: Yup.string().min(10, "Too short")
            .max(30, "Too long").required("Required!"),
        price: Yup.number().min(0, "Not price")
            .max(500000, "Too expensive").required("Required!")
    })

    return (
        <>
            <Formik
                //giá trị khởi tạo ban đầu của form
                initialValues={
                    {
                        id: props.product.id,
                        name: props.product.name,
                        price: props.product.price,
                        quantity: props.product.quantity,
                        description: props.product.description,
                    }
                }
                //hành động được thực thi khi xử lý hàm submit của form
                onSubmit={(values) => {
                    sendData(values)
                }
                }
                //cho phép sử dụng validate trong formik
                validationSchema={Validation}>

                <Form>
                    <div>
                        <label htmlFor={'name'}>Name</label>
                        <Field name={'name'} id={'name'} type={'text'}></Field>
                        <ErrorMessage name={'name'}/>
                    </div>
                    <div>
                        <label htmlFor={'price'}>Price</label>
                        <Field name={'price'} id={'price'} type={'text'}></Field>
                        <ErrorMessage name={'price'}/>
                    </div>
                    <div>
                        <label htmlFor={'quantity'}>Quantity</label>
                        <Field name={'quantity'} id={'quantity'} type={'text'}></Field>
                    </div>
                    <div>
                        <label htmlFor={'description'}>Description</label>
                        <Field name={'description'} id={'description'} type={'text'}></Field>
                    </div>
                    <div>
                        <button type={'submit'}>Create</button>
                        <button type={'reset'}>Reset</button>
                    </div>
                </Form>
            </Formik>
        </>
    )

    function sendData(values) {
        props.parentCallback({product: values})
    }
}
