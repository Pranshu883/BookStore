import axios from "axios"

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

class BookService {
    GetAllBooks = async(payload) => {
       return axios.get(`${BASEURL}/all`,payload)
    };

}

export default new BookService();