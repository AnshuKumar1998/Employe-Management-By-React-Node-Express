import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Student() {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    // Get token from localStorage
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get('http://localhost:8081/api/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => setStudents(res.data))
        .catch(err => {
            console.log(err);
            setError('Failed to fetch students');
            // Handle token expiration
            if (err.response && err.response.status === 403) {
                // Token might be expired; attempt to refresh
                refreshToken();
            }
        });
    }, [token]);

    const deleteHandler = async (id) => {
        if (!id) {
            console.error('ID is undefined');
            return;
        }
        try {
            await axios.delete(`http://localhost:8081/api/student/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStudents(students.filter(student => student.id !== id));

        } catch (err) {
            console.log(err);
            setError('Failed to delete student');
        }
    };
    
    const refreshToken = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/login');
            localStorage.setItem('token', response.data.token);
            window.location.reload(); // Reload to use the new token
        } catch (err) {
            console.log('Error refreshing token:', err);
            // Redirect to login or show error
        }
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success'>Add +</Link>
                {error && <p className='text-danger'>{error}</p>}
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length > 0 ? (
                            students.map((student, i) => (
                                <tr key={i}>
                                    <td>{student.Name}</td>
                                    <td>{student.Email}</td>
                                    <td>
                                        <Link to={`update/${student.id}`} className='btn btn-primary'>Update</Link>
                                        <button className='btn btn-danger ms-2' onClick={() => deleteHandler(student.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className='text-center'>No students found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student;
