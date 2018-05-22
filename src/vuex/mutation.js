export default {
    sendplace(state,preload){
        console.log(preload)
        if(preload[1] === 0){
            state.dcity = preload[0];
            state.isShowIndex = false;
        }else {
            state.acity = preload[0];
            state.isShowIndex = false;
        }
             
    },
    changeMsg(state,preload){
        window.localStorage.setItem('lowprice',preload)
        state.globalMsg = preload;
    },
    changeIndex(state){
        state.isShowIndex = true;
    }
}