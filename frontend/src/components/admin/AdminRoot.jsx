import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const AdminRoot = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/register");
      } else {
        const { data } = await axios.post(
          "http://localhost:8080/api/users",
          {},
          {
            withCredentials: true,
          }
        );

        // if (!data?.status) {
        //   removeCookie("jwt");
        //   navigate("/login");
        // } else {
        //   // if (userData?.data?.position === "admin") {
        //   //   navigate("/admin/adminPanel");
        //   // console.log(userData.data.position);
        //   // }
        //   // dispatch(getAllcountryAction());
        // }
      }
    };

    verifyUser();
  }, [cookies, removeCookie, navigate]);

  return (
    <>
      <h1>Admin Header</h1>
      <Outlet />
    </>
  );
};

export default AdminRoot;