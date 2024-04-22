import { ErrorMessage, Field, Formik, Form, useField, useFormikContext } from 'formik';
import React from 'react'
import { toast } from 'react-toastify';

function Uploader() {
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const FileUploader = (props) => {
    const { setFieldValue } = useFormikContext();

    const handleIcon = async (e, setFieldValue) => {
      const file = e.target.files[0];

      //check the size of image 
      if (file?.size / 1024 / 1024 < 2) {
        const base64 = await convertToBase64(file);
        setFieldValue(props.name, base64);
      }
      else {
        toast.error('Image size must be of 2MB or less');
      };
    };

    return (
      <div>
        <input
          {...props}
          className='form-control'
          onChange={(e) => handleIcon(e, setFieldValue)}
        />
      </div>
    )
  }

  return (
    <div className="mb-3 form-group">
      <Formik
        initialValues={{
          file: '',
          businessLogo: '',
          utilityBill: ''
        }}
        onSubmit={(values) => {
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div>
              <FileUploader
                name='businessLogo'
                type='file'
              />
            </div>
            <div>
              <FileUploader
                name='utilityBill'
                type='file'
              />
            </div>
            <div>
              <FileUploader
                name='file'
                type='file'
              />
            </div>
            
            <button type='submit'>SUbmit</button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Uploader
