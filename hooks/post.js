import api from "../lib/axios";

export const PostRequests = () => {
    const getPostData = async () => {
        return await api.get('/post').then(response=>{
            return response;
        });
    };

    const addPost = async (postForm) => {
        return await api.post('/post', postForm).then(response=>{
            return response;
        });
    };

    const removePost = async (id) => {
        return await api.delete(`/post/${id}`).then(response=>{
            return response;
        });
    };

    const getUserData = async () => {
        return await api.get('/user').then(response=>{
            return response;
        });
    };

    const addUser = async (userData) => {
        return await api.post('/user', userData).then(response=>{
            return response;
        });
    };

    const removeUser = async (id) => {
        return await api.delete(`/user/${id}`).then(response=>{
            return response;
        });
    };

    return {getPostData, addPost, getUserData, addUser, removePost, removeUser};
}