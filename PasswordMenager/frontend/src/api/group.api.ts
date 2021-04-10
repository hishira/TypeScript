import {getUrl,fetchGetObjectWithtoken} from "./config.api";

const getGroupByUser = async (token:string)=>{
    const url = getUrl("group/byuser");
    return await fetch(url,fetchGetObjectWithtoken(token))
}

export {
    getGroupByUser,
}