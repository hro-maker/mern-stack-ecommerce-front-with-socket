import { categoryConstans } from "../actions/constans";

const initialState = {
  categories: [],
  loading: false,
  loadingg:false,
  error: null,
};
const buildNewCategories=(parentId,categories,category)=>{
   let newcategories=[]
      if(parentId == undefined){
        return [
            ...categories,
            {
              _id:category._id,
              name:category.name,
              slug:category.slug,
              children:[]
            }
        ]
      }

    for(let cat of categories){
      if( cat._id == parentId){
        newcategories.push({
          ...cat,
          children:cat.children ?  buildNewCategories(parentId,[...cat.children,{
              _id:category._id,
              name:category.name,
              slug:category.slug,
              parentId:category.parentId,
              children:category.children
          }],category):[]
             })
      }else{
        newcategories.push({
          ...cat,
          children:cat.children  ?  buildNewCategories(parentId,cat.children,category):[]
             })
      }
    }
   return newcategories
}
const categoryReducer = (state = initialState, action) => {
 
       
    switch (action.type) {
      case categoryConstans.GETT_ALL_CATEGORIES_REQUEST:
      return (state = {
        ...state,
        loadingg:true
      });
      case categoryConstans.GETT_ALL_CATEGORIES_SUCCES:
      return (state = {
        ...state,
        categories: action.payload.categories,
        loadingg:false
      });
      
    case categoryConstans.GETT_ALL_CATEGORIES_FAILURE:
      return (state = {
        ...state,
        loadingg:false
      });
    case categoryConstans.ADD_NEW_CATEGORY_REQUEST:
      return (state = {
        ...state,
        loading: true,
      });
    case categoryConstans.ADD_NEW_CATEGORY_SUCCES:
      const category=action.payload.category;
        const updatedcategories=buildNewCategories(category.parentId,state.categories,category)
        
        return (state = {
        ...state,
        categories:updatedcategories,
        loading: true,
      });
    case categoryConstans.ADD_NEW_CATEGORY_FAILURE:
      return (state = {
        ...initialState,
      });
    default:
      return state;
  }
};
export default categoryReducer;
