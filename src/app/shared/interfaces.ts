export interface User {
  email: string,
  password: string,
  returnSecureToken?: boolean
}

export interface FbAuthResponse {
  idToken: string,
  expiresIn: string
}

export interface Product {
  id?: string,
  type: string,
  title: string,
  photo: string,
  info: string,
  price: number,
  date: Date
}

export interface FbCreateResponse {
  name: string
}
