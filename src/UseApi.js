import axios from "axios";
import _ from "lodash";
const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
};
const getErrors = (errorObj) => {
    let newErrors = {};
    _.forIn(errorObj, function (value, key) {
        newErrors[key] = value.message;
    });
    return { errors: newErrors }
}

export const getRoute = async (url, params) => {
    try {
        const { data, status } = await axios.get(url, {
            headers,
            params,
        });
        if (data?.errors) {
            return getErrors(data.errors);
        }
        return { data: data };
    } catch (err) {
        console.error(err)
        return err;
    }
};

export const postRoute = async (url, postData) => {
    try {
        const { data } = await axios.post(url, postData, {
            headers,
        });
        if (data?.errors) {
            return getErrors(data.errors);
        }
        return { data: data };
    } catch (err) {
        console.error(err)
        return err;
    }
};

export const deleteById = async (url, id) => {
    try {
        const { data } = await axios.delete(url, {
            headers,
        });
        if (data?.errors) {
            return getErrors(data.errors);
        }
        return { data: data };
    } catch (err) {
        console.error(err)
        return err;
    }
};

export const editRoute = async (url, formData, params = {}) => {
    try {
        const { data } = await axios.put(url, formData, {
            params,
            headers
        });
        if (data?.errors) {
            return getErrors(data.errors);
        }
        return { data: data };
    } catch (err) {
        console.error(err)
        return err;
    }

};
