import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Read = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        id: '',
        name: '',
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:5000/read/${id}`)
            .then(response => {
                console.log(response);
                if (response.data && response.data[0]) {
                    const userData = response.data[0];
                    setData({
                        id: userData._id,  // Use _id from MongoDB
                        name: userData.name,
                        email: userData.email,
                        password: userData.password
                    });
                }
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:5000/delete/${id}`)
                .then(response => {
                    console.log(response);
                    window.location.href = "/";  // Redirect to home after deletion
                })
                .catch(error => console.log(error));
        }
    };

    if (loading) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>;
    }

    return (
        <div className='d-flex flex-column vh-100 bg-light justify-content-center align-items-center'>
            <h4>User Details</h4>

            <div className='w-50 mt-2 bg-white rounded p-3'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={data.name} disabled />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" value={data.email} disabled />
                </div>

                <div className="mb-3">
                    <Link to='/' className='btn btn-dark'>Back</Link>
                    <Link to={`/update/${id}`} className='btn btn-outline-dark ms-1'>Update</Link>
                    <button onClick={handleDelete} className='btn btn-danger ms-1'>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default Read