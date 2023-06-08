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
      console.log('inside handle icon')
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
          console.log(values)
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {/* <div>
              <label className="required">Upload Photo</label>
              <input type='file' name='file' onChange={
                (e) => { handleIcon(e, setFieldValue) }
              }
              />
            </div> */}
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
      {/* <label className="required">Upload Photo</label>
        <Formik
          initialValues={{
            email: '',
            profile_image: '',
            lastName: '',
          }}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }, 1000);
          }}
        >
          <div>
            <Field name='profile_image'>
              {({ form, field }) => {
                const { setFieldValue } = form
                return (
                  <input
                    type="file"
                    className='form-control'
                    required
                    name='profile_image'
                    onChange={(e) => handleIcon(e, setFieldValue)}
                  />
                )
              }}
            </Field>
            <div className="text-danger">
              <ErrorMessage name="profile_image" />
            </div>
        </div>
      </Formik> */}
    </div>
  )
}

export default Uploader

// const singleImage = () => {

//  const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };

//   const handleIcon = async (e, setFieldValue) => {
//     const file = e.target.files[0];
//        //check the size of image
//     if (file?.size/1024/1024 < 2) {
//       const base64 = await convertToBase64(file);
//       setFieldValue('profile_image', base64);
//     }
//     else {
//       toast.error('Image size must be of 2MB or less');
//     };
//   };

//   return (
//        <div className="mb-3 form-group">
//           <label className="required">Upload Photo</label>
//                <Field name='profile_image'>
//                    {({ form, field }) => {
//                      const { setFieldValue } = form
//                         return (
//                           <input
//                             type="file"
//                              className='form-control'
//                               required
//                           onChange={(e) => handleIcon(e, setFieldValue)}
//                              />
//                             )
//                           }}
//                      </Field>
//                    <div className="text-danger">
//                <ErrorMessage name="profile_image" />
//          </div>
//      </div>
//  )
// };