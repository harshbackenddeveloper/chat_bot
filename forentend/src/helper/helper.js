import axios from "axios";

export const makeApi = async (req, url, body) => {

    const userToken = localStorage.getItem('UserToken');
    const getToken = JSON.parse(userToken)

    const previousUrl = "http://localhost:9000"
    var config = {
        method: req,
        url: previousUrl + url,
        data: body,
        headers: {
            Authorization: `Bearer ${getToken}`
        }
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}