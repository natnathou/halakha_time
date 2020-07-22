import axios from "axios";

export default axios.create(
    {
        baseURL:"https://api.sunrise-sunset.org/",
    }
);