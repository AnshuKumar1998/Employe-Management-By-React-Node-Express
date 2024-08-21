import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null); // State for handling errors
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const submitHandler = (event) => {
        event.preventDefault();

        // Basic validation
        if (!name || !email) {
            setError('Both name and email are required');
            return;
        }

        axios.post('http://localhost:8081/api/create', 
            { name, email }, 
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                navigate('/'); // Navigate after successful form submission
            })
            .catch(err => {
                console.log(err);
                setError('Failed to create student'); // Set error message if creation fails
            }
        );
        
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={submitHandler}>
                    <h2>Add Student</h2>
                    {error && <p className='text-danger'>{error}</p>} {/* Display error message if there is one */}
                    <div className='mb-2'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text' 
                            id='name'
                            placeholder='Enter Name' 
                            className='form-control' 
                            value={name}
                            onChange={e => setName(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='text' 
                            id='email'
                            placeholder='Enter Email' 
                            className='form-control' 
                            value={email}
                            onChange={e => setEmail(e.target.value)} 
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>  
            </div>
        </div>
    );
}

export default CreateStudent;
