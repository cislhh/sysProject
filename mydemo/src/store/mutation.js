export default{
    //触发修改state
    reqMenuList(state,payload){
        state.menuList=payload
    },
    //触发修改state
    reqRoleList(state,payload){
        state.roleList=payload
    },
    //触发修改state
    reqUserList(state,payload){
        state.userList=payload
    }
}