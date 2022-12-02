import { useState, useCallback, useEffect } from "react";
import ApiService from "../../apiService/apiService";

export default function Pagination({ setTransactions, pages, query }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  const getNewData = useCallback(async () => {
    try {
      const res = await ApiService.getTransactopn(query, currentPage);
      setTransactions(res);
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, query, setTransactions]);

  const changePageArrow = useCallback(
    (data) => {
      data.target.value === "prev"
        ? setCurrentPage(currentPage - 1)
        : setCurrentPage(currentPage + 1);
      getNewData();
    },
    [currentPage, getNewData]
  );

  const changePage = useCallback(
    async (data) => {
      setCurrentPage(Number(data.target.value));
      getNewData();
    },
    [getNewData]
  );
  return (
    <div className="pagination">
      <ul className="pagination__container _container">
        <li>
          <button
            type="button"
            value="prev"
            onClick={changePageArrow}
            className="pagination__btn--prev"
            disabled={currentPage > 1 ? false : true}
          ></button>
        </li>
        {pageNumbers.map((num) => (
          <li key={num}>
            <button
              type="button"
              value={num}
              onClick={changePage}
              className={`pagination__btn ${
                num === currentPage && "currentPage"
              }`}
            >
              {num}
            </button>
          </li>
        ))}
        <li key={"next"}>
          <button
            type="button"
            value="next"
            onClick={changePageArrow}
            className="pagination__btn--next"
            disabled={pageNumbers.length >= currentPage - 1 ? true : false}
          ></button>
        </li>
      </ul>
    </div>
  );
}
