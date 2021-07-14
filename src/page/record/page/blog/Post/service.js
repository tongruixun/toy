import {blog} from '@/util/request'

export function getPost() {
    return blog.get('/post/post');
}

export function addPost(data) {
    return blog.post('/post/insert',data)
}