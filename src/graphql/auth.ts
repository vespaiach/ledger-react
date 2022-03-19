export const signinMutation = /* GraphQL*/`mutation Signin($email: String!) {
  signin(email: $email)
}`

export const signoutMutation = /* GraphQL*/`mutation Signout {
  signout
}`

export const tokenMutation = /* GraphQL*/`mutation Token($key: String!) {
  token(key: $key)
}`
