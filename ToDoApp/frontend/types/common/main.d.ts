interface ITask {
    _id: string,
    createDate: Date,
    editDate: Date,
    content: string,
}
type HeaderKeyPairn = {
    name: string,
    value:string
}
type AllTaskResponse = {
    status:boolean,
    response: Array<ITask>,
}