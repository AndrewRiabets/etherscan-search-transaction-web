import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ApiService from "../../apiService/apiService";

export default function QueryField({ setTransactions, currentPage, setQuery }) {
  const [isActive, setIsActive] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: "onSubmit" });

  const activeOptions = () => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  const onSubmit = useCallback(
    async (data) => {
      if (!data?.query) {
        return;
      }
      try {
        const res = await ApiService.getTransactopn(data, currentPage);
        setTransactions(res);
        setQuery(data);
      } catch (error) {
        console.log(error);
        showMessage(error.response);
      }
    },
    [currentPage, setQuery, setTransactions]
  );

  useEffect(() => {
    onSubmit();
  }, [currentPage, onSubmit]);

  const showMessage = (response) => {
    toast.error(`${response.data.message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  };

  return (
    <div className="query-field">
      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="query-field__form _container"
      >
        <div
          className={
            !isActive
              ? "query-field__query-menu query-field__query-menu--notActive"
              : "query-field__query-menu query-field__query-menu--isActive"
          }
        >
          <input
            className="query-field__input"
            id="searchField"
            type="text"
            name="searchField"
            placeholder="Search"
            required
            {...register("query", {
              required: "This is a required field!",
            })}
          />
          {errors?.name && <p>{errors?.name?.message || "Error"}</p>}
          <select
            className="query-field__options"
            id="queryOptions"
            name="queryType"
            required
            onClick={activeOptions}
            {...register("queryType")}
          >
            <option value="getByHash">Hash</option>
            <option value="getByBlock">Block</option>
            <option value="getBySender">Sender</option>
            <option value="getByRecipient">Recipient</option>
          </select>
        </div>

        <button type="submit" className="query-field__submitBtn"></button>
      </form>
      <ToastContainer />
    </div>
  );
}
