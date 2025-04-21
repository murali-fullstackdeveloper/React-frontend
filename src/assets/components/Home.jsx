import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [getData, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = () => {
        setLoading(true);
        axios.get('http://localhost:5000/')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setError("Failed to fetch data");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete(`http://localhost:5000/delete/${id}`)
                .then(response => {
                    console.log(response);
                    // Refresh data instead of reloading the page
                    fetchData();
                })
                .catch(error => {
                    console.log(error);
                    alert("Failed to delete user");
                });
        }
    };

    if (loading) {
        return (
            <div className="d-flex flex-column vh-100 bg-light justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex flex-column vh-100 bg-light justify-content-center align-items-center">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <button className="btn btn-primary" onClick={fetchData}>Retry</button>
            </div>
        );
    }

    return (
        <div className="d-flex flex-column vh-100 bg-light justify-content-center align-items-center">
            <h4>Sample Data Set</h4>
            <div className="w-75 mt-2 bg-white rounded p-3">
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/create" className="btn btn-dark btn-sm">Add Data</Link>
                </div>
                
                {getData.length === 0 ? (
                    <div className="alert alert-info">No users found. Add some data!</div>
                ) : (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getData.map((data) => {
                                return (
                                    <tr key={data._id}>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>
                                            <Link to={`/read/${data._id}`} className="btn btn-info btn-sm me-1">Read</Link>
                                            <Link to={`/update/${data._id}`} className="btn btn-warning btn-sm me-1">Edit</Link>
                                            <button onClick={() => handleDelete(data._id)} className="btn btn-danger btn-sm">Delete</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Home;