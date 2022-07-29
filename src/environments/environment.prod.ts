export const environment = {
  production: true,
  baseUrl: 'http://localhost:8000/',

  get apiBaseUrl(){
    return this.baseUrl+'api/'
  },
  
  get sanctumCsrfCookieUrl(){
    return this.baseUrl+"sanctum/csrf-cookie";
  },
  
  get loginUrl(){
    return this.baseUrl+"login";
  },
  get logoutUrl(){
    return this.baseUrl+"logout";
  },
  
  get authenticatedUserUrl(){
    return this.apiBaseUrl+"user";
  },

  get productListUrl(){
    return this.apiBaseUrl+"product-list";
  },

  get userProductListUrl(){
    return this.apiBaseUrl+"my-product-list";
  },
  
  get addNewProductUrl(){
    return this.apiBaseUrl+"product/";
  },

  get placeOrderUrl(){
    return this.apiBaseUrl+"place-order/";
  },

  get userOrderListUrl(){
    return this.apiBaseUrl+"my-orders-list/";
  },
};
