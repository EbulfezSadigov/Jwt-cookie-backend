import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate()
    const [success, setsuccess] = useState("")
    const [error, seterror] = useState("")

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users', data)
            .then(res => {
                setsuccess(res.data)
                console.log(res.data);
                navigate('/login')
            })
            .catch(errors => seterror(errors))
    }

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome Back</h1>
                    <Link to="/login">
                        <button type="button" className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleRegister}>
                        <h1>Create Account</h1>
                        {error && <div className="error_msg"><h2>Email already exists</h2></div>}
                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            required
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <input
                            autoComplete="current-password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.green_btn}>
                            Sing Up
                        </button>
                        {success && <div>Success Register</div>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;