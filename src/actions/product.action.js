import axioss from './../helpers/axios';
import { productConstans } from './constans';
export const getproductsbyslug =(slug)=>{
    return async dispatch =>{
       
        const res = await axioss.get(`products/${slug}`)
        if(res.status === 200){
            dispatch({
                type:productConstans.GETT_PRODUCTS_BY_SLUG,
                payload:res.data
            })
        }else{
            console.log('error')
        }
    }
}
export const getallproducts =()=>{
    return async dispatch =>{
        const res= await axioss.get("/product/getall")
        dispatch({
            type:productConstans.GETT_ALL_PRODUCTS,
            payload:res.data.products
        })
      
    }
    
}

export const getproductPage =(payload)=>{
    return async dispatch =>{
        try {
            const {cid,type}=payload.params
        const res = await axioss.get(`page/${cid}/${type}`)
        dispatch({type:productConstans.GET_PRODUCT_PAGE_REQUEST})
        if(res.status === 200){
            const {page}=res.data;
           dispatch({
               type:productConstans.GET_PRODUCT_PAGE_SUCCES,
               payload:{page}
           }) 
        }else{
            const {error}=res.data;
            dispatch({
                type:productConstans.GET_PRODUCT_PAGE_FAILURE,
                payload:{error}
            }) 
        }
        } catch (error) {
                console.log(error)
        }
    }
}
 const getProductDetailById =(payload) =>{
    return async dispatch =>{
        dispatch({type:productConstans.GETT_PRODUCT_DETAILS_BY_ID_REQUEST})
        let res;
        try {
            const {productId} = payload.params;
            res= await axioss.get(`/product/${productId}`)
            
            dispatch({
                type:productConstans.GETT_PRODUCT_DETAILS_BY_ID_SUCCES,
                payload:{productDetails: res.data.product}
            })
        } catch (error) {
            console.log('product id error',error)
           dispatch({
            type:productConstans.GETT_PRODUCT_DETAILS_BY_ID_FAILURE,
            payload:{error: res.data.error}
           })
        }
    }
}
export const addcoment =(payload)=>{
    return async dispatch =>{
       
        const res = await axioss.post(`/product/addcoment`,{
            ...payload
        })
      
    }
}
export const adreting =(payload)=>{
  
    return async dispatch =>{
       
        const res = await axioss.post(`/product/addretinc`,{
            ...payload
        })
       
      
    }
}
export {getProductDetailById}