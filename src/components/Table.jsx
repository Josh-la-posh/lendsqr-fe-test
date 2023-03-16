import React, { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "rc-pagination";
import moment from "moment";
import { URL } from "../url";
import { DropdownForm } from "./Dropdown";
import { PopupForm } from "./Dropdown";

// type Parameters = {
//   value: number;
//   current: number;
//   pageSize: number;
//   page: number;
//   type: string;
//   originalElement: number;
//   index: number;
//   id: number;
//   size: number;
// };

// type PageValue = {
//   current: number;
//   pageSize: number;
// };

// interface PaginationProps {
//   className: string;
//   showTotal: (total: number, range: [number, number]) => React.ReactNode;
//   onChange: (page: number, pageSize?: number) => void;
//   total: number;
//   current: number;
//   pageSize: number;
//   showSizeChanger: boolean;
//   itemRender: (page: number, type: "page" | "prev" | "next") => React.ReactNode;
//   onShowSizeChange: (current: number, size: number) => void;
// }

export default function Table() {
  const [data, setData] = useState([]);
  const [perPage, setPerPage] = useState(9);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [isDropdown, setIsDropDown] = useState(null);
  const [isOptionOpen, setIsOptionOpen] = useState(null);

  // const params: PageValue = { current: current, pageSize: size };

  const headers = [
    "organization",
    "username",
    "email",
    "phone number",
    "date joined",
    "status",
  ];

  const PerPageChange = (value) => {
    setSize(value);
    const newPerPage = Math.ceil(data.length / value);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  function getData( current, pageSize) {
    return data.slice((current - 1) * pageSize, current * pageSize);
  }
  // const result = getData(params);

  const PaginationChange = ( page, pageSize ) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = ( current, type, originalElement ) => {
    if (type === "prev") {
      return (
        <button>
          <img
            src="../../images/down-arrow.svg"
            style={{ transform: "rotate(90deg)" }}
            alt=""
          />
        </button>
      );
    }
    if (type === "next") {
      return (
        <button>
          <img
            src="../../images/down-arrow.svg"
            style={{ transform: "rotate(-90deg)" }}
            alt=""
          />
        </button>
      );
    }
    return originalElement;
  };

  function getDataFromApi() {
    axios.get(`${URL}`).then(function (response) {
      setData(response.data);
    });
  }

  function optionOpenHandler(id) {
    if (isOptionOpen === id) {
      setIsOptionOpen(null);
    } else {
      setIsOptionOpen(id);
    }
  }

  useEffect(() => {
    getDataFromApi();
  }, []);

  return (
    <div className="mainContent">
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => {
                return (
                  <th key={index}>
                    <span className="table__header">
                      {header}{" "}
                      <span
                        className="img"
                        onClick={() =>
                          isDropdown === index
                            ? setIsDropDown(null)
                            : setIsDropDown(index)
                        }
                      >
                        <img src="../../images/vector.png" alt="" />{" "}
                        {isDropdown === index && <DropdownForm />}
                      </span>
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data &&
              getData(current, size).map((data) => {
                return (
                  <tr key={data.id}>
                    <td style={{ textTransform: "capitalize" }}>
                      <Link to={`/user/${data.id}`}>{data.orgName}</Link>
                    </td>
                    <td>{data.userName}</td>
                    <td>{data.email}</td>
                    <td>{data.phoneNumber}</td>
                    <td>
                      {moment(data.createdAt).format("MMM D, YYYY h:mm a")}
                    </td>
                    <td>
                      <div className="status">
                        <span className="active">Active</span>{" "}
                        <span
                          className="img"
                          onClick={() => optionOpenHandler(data.id)}
                        >
                          <img src="../../images/3dot.png" alt="" />{" "}
                          {isOptionOpen === data.id && <PopupForm />}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <Pagination
        className="pagination-data"
        showTotal={(total, range) => `Showing ${range[1]} out of ${total}`}
        onChange={PaginationChange}
        total={data.length}
        current={current}
        pageSize={size}
        showSizeChanger={false}
        itemRender={PrevNextArrow}
        onShowSizeChange={PerPageChange}
      />
    </div>
  );
}
