export const signinMutation = /* GraphQL*/`mutation Signin($email: String!) {
  signin(email: $email)
}`

export const tokenMutation = /* GraphQL*/`mutation Token($key: String!) {
  token(key: $key)
}`
