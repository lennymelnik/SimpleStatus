
export const RegisterRequestValidator = (body) => {
    return body.hasOwnProperty('email') && body.hasOwnProperty('password') &&body.hasOwnProperty('inviteCode');
};

export const LoginRequestValidator = (body) => {
    return body.hasOwnProperty("email") && body.hasOwnProperty("password")
};

export const SearchRequestValidator = (body) => {
    return body.hasOwnProperty("search") 
    || body.hasOwnProperty("blog")
    || body.hasOwnProperty("isPublic")
    || body.hasOwnProperty("timeSort")
};

export const ExistsRequestValidator = (body) => {
    return body.hasOwnProperty("title") 
    || body.hasOwnProperty("victim")
    || body.hasOwnProperty("idOnBlog")
};
export const AddPostRequestValidator = (body) => {
    return body.hasOwnProperty("search") 
    || body.hasOwnProperty("blog")
    || body.hasOwnProperty("isPublic")
    || body.hasOwnProperty("timeSort")
};
export const CreateViewValidator = (body) => {
    return body.hasOwnProperty("view")
};
