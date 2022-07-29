// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
