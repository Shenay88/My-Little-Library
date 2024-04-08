export class User {
  /* EXPLANATION

  * 1. Instead seperatly creating the properties and then initialising in the Constructor, we create parameters and using "public" this property will be asigned with the value which we'll receive for public parameters.
  * 2. "private" - We want to use this private property but we don't want that property to be modified.
  * 3. _ - because it is private property
  * 4. new Date - for the current time.
  * 5. get token(){} - We are creating like a function but it is a property. We can access the token in this way.
  * 6. We check if _expireIn does not exist in this user or if it is exist but less than current time which means it expired we return null for the token.
  * 7. We use this class in the user.service.ts - as soon as a new user signs up or existing logs in we want to create a new user object with the response data which we will receive.
  
  */

  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _expireIn: Date
  ) {}

  get token() {
    if (!this._expireIn || this._expireIn < new Date()) {
      return null;
    }
    return this._token;
  }
}
