import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { URL } from "../url";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import UserPage from "../components/UserPage";
import Loader from "../components/Loader";

export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  let { id } = useParams();

  async function getDataById() {
    await axios
      .get(`${URL}/${id}`)
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        const err = error.response.data;
        console.log(err);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getDataById();
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <Header />
      </div>
      <div className="dashboard__body">
        <Sidebar />
        {isLoading ? <Loader /> : <UserPage data={data} />}
      </div>
    </div>
  );
}
