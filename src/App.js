import { useState } from "react";
import Wrapper from "./components/Wrapper/Wrapper";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import QueryField from "./components/QueryField/QueryField";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";

console.log(parseInt(0xf5a2bb));
function App() {
  const [transactions, setTransactions] = useState();
  const [query, setQuery] = useState(1);

  return (
    <>
      <Wrapper>
        <Header />
        <QueryField setTransactions={setTransactions} setQuery={setQuery} />
        <Table data={transactions} />
        {transactions && (
          <Pagination
            setTransactions={setTransactions}
            pages={transactions.pages}
            query={query}
          />
        )}
        <Footer />
      </Wrapper>
    </>
  );
}

export default App;
