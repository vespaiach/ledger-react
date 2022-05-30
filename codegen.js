require('dotenv').config();

const { generate } = require('@graphql-codegen/cli');
const fs = require('fs');

(async function main() {
  const pwd = process.cwd();
  const { VITE_GRAPHQL_URL } = process.env;

  const generatedFiles = await generate(
    {
      schema: VITE_GRAPHQL_URL,
      documents: './src/graphql/**/*.ts',
      generates: {
        [`${pwd}/src/graphql.generated.ts`]: {
          plugins: ['typescript', 'ledger.codegen.plugin.js'],
          config: {
            arrayInputCoercion: false,
            avoidOptionals: false,
            skipTypename: true,
            scalars: {
              DateTime: 'string',
              Date: 'string',
              Void: 'void',
              EmailAddress: 'string',
              NonEmptyString: 'string',
              password_String_minLength_5_maxLength_127: 'string',
              firstName_String_maxLength_127: 'string',
              lastName_String_maxLength_127: 'string',
              password_String_NotNull_minLength_5_maxLength_127: 'string',
              password_String_minLength_5_maxLength_127: 'string',
              username_String_NotNull_minLength_3_maxLength_127_pattern_09azAZ_: 'string',
              username_String_minLength_3_maxLength_127_pattern_09azAZ_: 'string',
            },
          },
        },
      },
    },
    true
  );

  generatedFiles.map((file) => fs.writeFileSync(file.filename, file.content, { flag: 'w+' }));
})();
