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
type CreateTaskDTO = {
    content: string,
}
type CreateTaskResponse = {
    status: boolean,
    newtask: ITask | null,
}
type DeleteTaskDTO = {
    taskid: string,
}