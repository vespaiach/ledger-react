export const createUserMutation = /* GraphQL*/ `
  mutation CreateUserMutation($username: username_String_NotNull_minLength_3_maxLength_127_pattern_09azAZ_!, $email: EmailAddress!, $password: password_String_NotNull_minLength_5_maxLength_127!, $firstName: firstName_String_maxLength_127, $lastName: lastName_String_maxLength_127) {
    createUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
      username
      email
      isActive
    }
  }
`;

export const updateUserMutation = /* GraphQL*/ `
  mutation UpdateUserMutation($username: username_String_minLength_3_maxLength_127_pattern_09azAZ_, $email: EmailAddress, $password: password_String_minLength_5_maxLength_127, $firstName: String, $lastName: String, $isActive: Boolean) {
    updateUser(username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName, isActive: $isActive) {
      id
      firstName
      lastName
      username
      email
      isActive
    }
  }
`;
