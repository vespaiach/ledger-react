export const signinMutation = /* GraphQL*/ `mutation Signin($username: username_String_NotNull_minLength_3_maxLength_127_pattern_09azAZ_!, $password: password_String_NotNull_minLength_5_maxLength_127!) {
  signin(username: $username, password: $password)
}`;

export const signoutMutation = /* GraphQL*/ `mutation Signout {
  signout
}`;