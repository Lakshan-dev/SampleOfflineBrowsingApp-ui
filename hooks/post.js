import api from "../lib/axios";

export const PostRequests = () => {
    const getPostData = async () => {
        return await fetch(`${process.env.PUBLIC_BACKEND_DOMAIN}/post`).then(response=>response.json())
            .then(data=> {
                return data
            })
    };

    const addPost = async (postForm) => {
        return await api.post('/post', postForm).then(response=>{
            return response;
        });
    };

    const removePost = async (id) => {
        return await fetch(`${process.env.PUBLIC_BACKEND_DOMAIN}/post/${id}`, {method:'DELETE'}).then(response=>response.json())
            .then(data=> {
                return data;
            })
    };

    const getUserData = async () => {
        return await fetch(`${process.env.PUBLIC_BACKEND_DOMAIN}/user`).then(response=>response.json())
            .then(data=> {
                return data
            });
    };

    const addUser = async (userData) => {
        return await api.post('/user', userData).then(response=>{
            return response;
        });
    };

    const removeUser = async (id) => {
        return await fetch(`${process.env.PUBLIC_BACKEND_DOMAIN}/user/${id}`,{method:'DELETE'}).then(response=>response.json())
            .then(data=> {
                return data
            });
    };

    return {getPostData, addPost, getUserData, addUser, removePost, removeUser};
}