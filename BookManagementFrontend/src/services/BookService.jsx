import axios from "axios";

class BookService {
    BASE_URL = "http://localhost:8080/api/v1/bookmanagement";

    getAllBooks(token) {
        // return axios.get(this.BASE_URL+'/findallbook')
        //const token = localStorage.getItem('token');
        return axios({
            method: 'get',
            url: this.BASE_URL + '/findallbook',
            responseType: 'stream',
            headers: { 
            'Authorization': `Bearer ${token}`
                    }
        })
    }
    
    saveBook(bookObj) {
        //return axios.post(this.BASE_URL+'/createBook',bookObj)
        return axios({
            method: 'post',
            url: this.BASE_URL + '/createBook',
            data: bookObj,
            headers: { 'X-Custom-Header': 'foobar' }

        })
    }

    findByIsbn(isbn) {
        //return axios.get(this.BASE_URL+'/findByBookId'+isbn)
        return axios({
            method: 'get',
            url: this.BASE_URL + "/findByBookId?isbn=" + isbn,
            responseType: 'json',
            headers: { 'Access-Control-Allow-Origin': '*' }
        })
    }

    updateBook(bookObj, isbn) {
        //return axios.post(this.BASE_URL+'/createBook',bookObj)
        return axios({
            method: 'put',
            url: this.BASE_URL + '/updateBook?isbn=' + isbn,
            data: bookObj,
            headers: { 'X-Custom-Header': 'foobar' }

        })
    }

    deleteByIsbn(isbn,token) {
        //return axios.get(this.BASE_URL+'/findByBookId'+isbn)
        return axios({
            method: 'delete',
            url: this.BASE_URL + "/deleteByBookId?isbn=" + isbn,
            responseType: 'json',
            headers: { 'Authorization': `Bearer ${token}` }
        })
    }

}

// axios.post(url,data, {
//     headers: {
//         'authorization': your_token,
//         'Accept' : 'application/json',
//         'Content-Type': 'application/json'    }
// })
// .then(response => {
//     // return  response;})
// .catch((error) => {
//     //return  error;
// });

export default new BookService();

