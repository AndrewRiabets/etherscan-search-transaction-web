import axios from "axios";

const BASE_URL =
  "https://search-transaction-etherscan-api.onrender.com/api/get-transactions";
const limit = 14;

class ApiService {
  async getTransactopn(query, page) {
    const { data } = await axios.get(BASE_URL, {
      params: { ...query, page: page, limit: limit },
    });
    return data;
  }
}

export default new ApiService();
