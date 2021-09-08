import axios from "axios";

const API = axios.create({ baseURL: 'https://social-api-ct466.herokuapp.com/api'});

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const signIn = (formData) => API.post('/auth/login', formData);
export const signUp = (formData) => API.post('/auth/register', formData);

export const googleAccount = (formData) => API.post('/auth/create', formData);

export const upload = (data) => API.post('/upload', data);

export const createPost = (newPost) => API.post('/posts', newPost);

export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = () => API.get('/posts/timeline/all');

export const likePost = (id) => API.patch(`/posts/${id}/like`);
export const deletePost = (id) => API.delete(`/posts/${id}`);

export const updateUser = (id,data) => API.put(`/users/${id}`, data);