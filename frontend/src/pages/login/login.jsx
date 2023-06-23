import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
    const [datas, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...datas, [input.name]: input.value });
    };

    const handleLoginAuth = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            let { data } = await axios.post("http://localhost:8080/api/users/login", datas, {
                withCredentials: true,
            });
            setError(data.errors);
            console.log(data);
            if (data && data.data.isAdmin) {
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) {
                        setLoading(false);
                    } else if (password) {
                        setLoading(false);
                    }
                } else {
                    navigate("/admin");
                    setLoading(false);
                }
            }
            else if (data && !data.data.isAdmin){
                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) {
                        setLoading(false);
                    } else if (password) {
                        setLoading(false);
                    }
                } else {
                    navigate("/");
                    setLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleLoginAuth}>
                        <h1>Login to Your Account</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={handleChange}
                            value={datas.email}
                            required
                            className={styles.input}
                        />
                        <input
                            autoComplete="current-password"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            value={datas.password}
                            required
                            className={styles.input}
                        />
                        {error && <div className={styles.error_msg}>Email or Password invalid</div>}
                        <button type="submit" className={styles.green_btn}>
                            Sign In
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>New Here ?</h1>
                    <Link to="/register">
                        <button type="button" className={styles.white_btn}>
                            Sing Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;