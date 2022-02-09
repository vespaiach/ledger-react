require('dotenv').config();

const { generate } = require('@graphql-codegen/cli');
const fs = require('fs');

(async function main() {
  const pwd = process.cwd();
  const { REACT_APP_LEDGER_GRAPHQL_API } = process.env;

  const generatedFiles = await generate(
    {
      schema: REACT_APP_LEDGER_GRAPHQL_API,
      documents: './src/graphql/**/*.graphql',
      generates: {
        [`${pwd}/src/graphql/graphql.generated.ts`]: {
          plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
          config: {
            maybeValue: ' T | null | undefined',
            avoidOptionals: true,
          },
        },
        [`${pwd}/src/graphql/graphql.schema.json`]: {
          plugins: ['introspection'],
        },
      },
    },
    true
  );

  generatedFiles.map((file) => fs.writeFileSync(file.filename, file.content, { flag: 'w+' }));
})();
