import React, { useState } from 'react';
import CardInput from '../common/CardInput';
import { useFormik } from 'formik';
import Joi from 'joi';
import { joiValidation } from '../joiValidate';
import { createCard } from '../userService/card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CardCreateCard = () => {
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: '',
      bizPhone: '',
      bizAddress: '',
      bizDescription: '',
      bizImage: '',
    },
    validate: joiValidation({
      bizName: Joi.string().min(2).max(1024).required(),
      bizPhone: Joi.string().required(),
      bizAddress: Joi.string().required(),
      bizDescription: Joi.string().required(),
      bizImage: Joi.string().allow('').label('Image'),
    }),

    async onSubmit(values) {
      const { bizImage, ...body } = values;
      if (bizImage) {
        body.bizImage = bizImage;
      }
      try {
        await createCard(body);
        toast('Card was created ✔');
        navigate('/my-cards');
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  return (
    <>
      <form className="form" onSubmit={form.handleSubmit} noValidate>
        {error && <p>{error}</p>}

        <CardInput
          inputClass={'input'}
          label="Name"
          type="text"
          name="bizName"
          id="bizName"
          error={form.touched.bizName && form.errors.bizName}
          {...form.getFieldProps('bizName')}
          onChange={form.handleChange}
        />
        <CardInput
          inputClass={'input'}
          label="Phone"
          type="text"
          name="bizPhone"
          id="bizPhone"
          error={form.touched.bizPhone && form.errors.bizPhone}
          {...form.getFieldProps('bizPhone')}
          onChange={form.handleChange}
        />
        <CardInput
          inputClass={'input'}
          label="Address"
          type="text"
          name="phone"
          id="bizAddress"
          error={form.touched.bizAddress && form.errors.bizAddress}
          {...form.getFieldProps('bizAddress')}
          onChange={form.handleChange}
        />
        <CardInput
          inputClass={'input'}
          label="Description"
          type="text"
          name="bizDescription"
          id="bizDescription"
          error={form.touched.bizDescription && form.errors.bizDescription}
          {...form.getFieldProps('bizDescription')}
          onChange={form.handleChange}
        />
        <CardInput
          inputClass={'input'}
          label="Image"
          type="text"
          name="bizImage"
          id="bizImage"
          error={form.touched.bizImage && form.errors.bizImage}
          {...form.getFieldProps('bizImage')}
          onChange={form.handleChange}
        />

        <button className="btn" type="submit">
          Done ✔
        </button>
      </form>
    </>
  );
};

export default CardCreateCard;
