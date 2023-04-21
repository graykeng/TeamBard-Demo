import Axios from "axios";

const url = "http://34.125.199.139"

export const getJSON = (id) => {
    return Axios.get(url + `/shop_number/${id}`)
    .then((response) => response.data);
};
