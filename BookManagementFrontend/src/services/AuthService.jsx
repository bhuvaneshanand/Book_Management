import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/bookmanagement";
class AuthService{
    registerUser(userObj){
        return axios({
            method: 'post',
            url: BASE_URL + '/auth/signup',
            data: userObj,
            headers: { 'X-Custom-Header': 'foobar' }
        })
    }

    loginUser(userObj){
        return axios({
            method: 'post',
            url: BASE_URL + '/auth/login',
            data: userObj,
            headers: { 'X-Custom-Header': 'foobar' }
        })
    }
}

    // saveEmployee2(employeeObj) {
    //     return axios({
    //         method: 'post',
    //         url: this.BASE_URL,  // Use the base URL directly
    //         data: employeeObj,       // Include the object in the request
    //         headers: {
    //             'x-Custom-Header': 'foobar'  ,
    //             'token':`Bearer ${accessToken}`// Optional custom header
    //         }
    //     });

export default new AuthService();