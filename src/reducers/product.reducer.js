import { productConstans} from '../actions/constans'


const initState = {
   products: [],
   priceRange: {},
   productsByPrice: {},
   pageRequest: false,
   page: {},
   error: null,
   productDetails: {},
   loading: false,
   allproducts:[]
 };

const productReducer= (state = initState, action) => {
   switch (action.type) {
     case productConstans.GETT_PRODUCTS_BY_SLUG:
       state = {
         ...state,
         products: action.payload.products,
         priceRange: action.payload.priceRange,
         productsByPrice: {
           ...action.payload.productsByPrice,
         },
       };
       break;
     case productConstans.GET_PRODUCT_PAGE_REQUEST:
       state = {
         ...state,
         pageRequest: true,
       };
       break;
       case productConstans.GETT_ALL_PRODUCTS:
       state = {
         ...state,
         allproducts:action.payload
       };
       break;
     case productConstans.GET_PRODUCT_PAGE_SUCCES:
       state = {
         ...state,
         page: action.payload.page,
         pageRequest: false,
       };
       break;
     case productConstans.GET_PRODUCT_PAGE_FAILURE:
       state = {
         ...state,
         pageRequest: false,
         error: action.payload.error,
       };
       break;
     case productConstans.GETT_PRODUCT_DETAILS_BY_ID_REQUEST:
       state = {
         ...state,
         loading: true,
       };
       break;
     case productConstans.GETT_PRODUCT_DETAILS_BY_ID_SUCCES:
       state = {
         ...state,
         loading: false,
         productDetails: action.payload.productDetails,
       };
       break;
     case productConstans.GETT_PRODUCT_DETAILS_BY_ID_FAILURE:
       state = {
         ...state,
         loading: false,
         error: action.payload.error,
       };
       break;
       default:
          return state
   }
 
   return state;
 };
 export default productReducer