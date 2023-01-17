

const initialState=false

export const loaderReducer=(state=initialState,action:changeLoaderStatusActionType)=>{
    switch (action.type){
        case "CHANGE_LOADING_STATUS":{
            return action.isLoading
        }
        default: return state
    }
}

type changeLoaderStatusActionType=ReturnType<typeof changeLoaderStatusAC>
export const changeLoaderStatusAC=(isLoading:boolean)=>{
    return{
        type:"CHANGE_LOADING_STATUS",
        isLoading
    }as const
}
