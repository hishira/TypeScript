import {types, Instance} from "mobx-state-tree"

export const General = types.model({
    useractive: types.optional(types.boolean,false),
}).actions((self)=>({
    setUserActive(useractive:boolean):void{
        self.useractive = useractive;
    }
})).views((self)=>({
    get UserActivity():boolean{
        return self.useractive;
    }
}))

export type IGeneral = Instance<typeof General>