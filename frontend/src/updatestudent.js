import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateStudent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams(); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch the student data when the component mounts or id/token changes
        axios.get(`http://localhost:8081/api/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => {
                setName(res.data.Name);
                setEmail(res.data.Email);
            })
            .catch(err => {
                console.log(err);
                setError('Failed to fetch student data');
            });
    }, [id, token]);

    const submitHandler = (event) => {
        event.preventDefault();

        // Basic validation
        if (!name || !email) {
            setError('All fields are required');
            return;
        }

        setError(null); // Reset error if validation passes

        axios.put(`http://localhost:8081/api/update/${id}`, { name, email }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                navigate('/'); // Navigate after successful form submission
            })
            .catch(err => {
                console.log(err);
                setError('Failed to update student'); // Set error message if update fails
            });
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={submitHandler}>
                    <h2>Update Student</h2>
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

export default UpdateStudent;
