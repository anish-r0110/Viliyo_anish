import React from 'react'

const UniqueLoginForm = () => {

    function decryptAndPreparePayload(data: any): any {
        const decodedData: any = {};
    
        // Decoding fields using window.atob()
        decodedData.trainee_name = window.atob(data.name);
        decodedData.trainee_email = window.atob(data.email);
        decodedData.programId = window.atob(data.programId);
        decodedData.batchId = window.atob(data.batchId);
        decodedData.type = window.atob(data.type);
    
        // Splitting first name and last name
        const nameParts = decodedData.trainee_name.split(' ');
        decodedData.first_name = nameParts[0];
        decodedData.last_name = nameParts[nameParts.length - 1];
    
        // Creating payload
        const payload: any = {
            trainee_name: decodedData.trainee_name,
            first_name: decodedData.first_name,
            last_name: decodedData.last_name,
            trainee_email: decodedData.trainee_email,
            trainee_password: "", // User should input this later
        };
    
        // Checking if type is unique
        if (decodedData.type === 'unique') {
            // If type is unique, generate a form with set password and confirm password fields
            payload.form = {
                set_password: "",
                confirm_password: ""
            };
        }
    
        return payload;
    }
    
    // Example usage
    const encryptedData = {
        email: 'c3VicmF0Y2hvd2RoYXJ5QG91dGxvb2suY29t',
        name: 'U3VicmF0IENob3dkaGFyeQ==',
        programId: 'NjA4NA==',
        batchId: 'MzIzNQ==',
        type: 'dW5pcXVl',
        registration: true,
        domain: ''
    };
    
    const payload = decryptAndPreparePayload(encryptedData);
    console.log(payload);
    


  return (
    <div>
      
    </div>
  )
}

export default UniqueLoginForm
