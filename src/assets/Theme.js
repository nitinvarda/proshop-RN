
const Assets = {
    Colors:(scheme)=>{
        let values ={}
        if(scheme == 'light'){
            values = {
                primary:'#d9d9d9',
                secondary:"#f2f2f2",
                textPrimary:"#333333",
            }
            
        }
        else{
            values = {
                primary:'#333333',
                secondary:'#4d4d4d',
                textPrimary:"#d9d9d9"
            }
        }
        return values;
    }
    
}

export default Assets;