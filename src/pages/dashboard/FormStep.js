import React, { useState } from 'react';

const FormComponent = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
   
  };

  const RenderStepContent = (step) => {
    switch (step) {
      case 1:
        return (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
    <h2>Form stepper</h2>
    <form>
      {RenderStepContent(step)}
      {step > 1 && (
        <button type="button" onClick={handlePrevious}>
          Previous
        </button>
      )}
      {step < 2 && (
        <button type="button" onClick={handleNext}>
          Next
        </button>
      )}
      {step === 2 && (
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      )}
    </form>
    </>
    
  );
};

export default FormComponent;
