import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import { addNewStudent } from '../client';

const inputBottomMargin = { marginBottom: '5px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin };

const AddStudentForm = (props) => (
    <Formik
        initialValues={{ firstName: '', lastName: '', email: '', gender: '' }}
        validate={values => {
            const errors = {};
            if (!values.firstName) {
                errors.firstName = 'First name required'
            }
            if (!values.lastName) {
                errors.lastName = 'Last name required'
            }
            if (!values.email) {
                errors.email = 'Email required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }
            if (!values.gender) {
                errors.gender = 'Gender required'
            } else if (!['MALE', 'FEMALE'].includes(values.gender)) {
                errors.gender = 'Must be male or female'
            }
            return errors;
        }}
        onSubmit={(student, { setSubmitting }) => {
            addNewStudent(student).then(() => {
                props.onSuccess();
                setSubmitting(false);
            })
        }}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            submitForm,
            isValid
        }) => (
            <form onSubmit={handleSubmit}>
                <Input
                    style={inputBottomMargin}
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="First name"
                />
                {errors.firstName && touched.firstName
                    && <Tag style={tagStyle}>{errors.firstName}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="Last name"
                />
                {errors.lastName && touched.lastName
                    && <Tag style={tagStyle}>{errors.lastName}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="email"
                    type="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    placeholder="example@mail.com"
                />
                {errors.email && touched.email
                    && <Tag style={tagStyle}>{errors.email}</Tag>}
                <Input
                    style={inputBottomMargin}
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    placeholder="Gender: MALE or FEMALE"
                />
                {errors.gender && touched.gender
                    && <Tag style={tagStyle}>{errors.gender}</Tag>}
                <Button
                    onClick={() => submitForm()}
                    type="submit"
                    disabled={isSubmitting | (touched && !isValid)}>
                    Submit
                </Button>
            </form>
        )}
    </Formik>
)


export default AddStudentForm;