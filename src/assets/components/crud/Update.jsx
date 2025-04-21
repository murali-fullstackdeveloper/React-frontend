import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Update = () => {
    const { id } = useParams();
    const [values, setValues] = useState({ 
        name: '', 
        email: '', 
        password: '' 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/read/${id}`)
            .then(response => {
                console.log(response);
                if (response.data && response.data[0]) {
                    const userData = response.data[0];
                    setValues({ 
                        name: userData.name, 
                        email: userData.email, 
                        password: userData.password 
                    });
                } else {
                    setError('User data not found');
                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError('Error loading user data');
                setLoading(false);
            });
    }, [id]);

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:5000/update/${id}`, values)
            .then(response => {
                console.log(response);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
                setError('Error updating user');
            });
    }

    if (loading) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <div className='d-flex flex-column vh-100 bg-light justify-content-center align-items-center'>
            <h4>Update User</h4>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="w-50 mt-2 bg-white rounded p-3">
                <form onSubmit={handleUpdate}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="name" 
                            value={values.name} 
                            onChange={e => setValues({ ...values, name: e.target.value })} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            value={values.email} 
                            onChange={e => setValues({ ...values, email: e.target.value })} 
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="password" 
                            value={values.password} 
                            onChange={e => setValues({ ...values, password: e.target.value })} 
                        />
                    </div>

                    <button type="submit" className="btn btn-dark">Update</button>
                    <Link to={`/read/${id}`} className="btn btn-outline-dark ms-1">Cancel</Link>
                </form>
            </div>
        </div>
    )
}

export default Update