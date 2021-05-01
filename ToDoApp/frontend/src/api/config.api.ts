import {headervalues} from "./constant.api"
const getURL:Function = (url:string):string=>{
    return `http://localhost:8080/${url}`
}
const GetFetchHeader:Function = (): Headers => {
    const newheader=new Headers();
    for(const i of headervalues){
        newheader.append(i.name,i.value);
    }
    return newheader;
}
const fetchObject:RequestInit = {
    mode:"cors",
    headers: GetFetchHeader(),
    credentials: "include",
    method: "GET",
}
export {getURL, fetchObject,}