import axioss from './../helpers/axios';
import { categoryConstans } from './constans';
export const getAllCategory=()=>{
    return async dispatch =>{
        dispatch({type:categoryConstans.GETT_ALL_CATEGORIES_REQUEST})
        const res= await axioss.get('category/getcategory')
          
            if(res.status===200){
                const {categoriList}=res.data
                dispatch({
                    type: categoryConstans.GETT_ALL_CATEGORIES_SUCCES,
                    payload:{categories:categoriList}
                })
            }else{
                dispatch({
                    type:categoryConstans.GETT_ALL_CATEGORIES_FAILURE,
                    payload:{error:res.data.error}
                })
            }
    }
}
