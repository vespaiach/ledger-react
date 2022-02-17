require('dotenv').config();

const { generate } = require('@graphql-codegen/cli');
const fs = require('fs');

(async function main() {
  const pwd = process.cwd();
  const { VITE_GRAPHQL_URL } = process.env;

  const generatedFiles = await generate(
    {
      schema: VITE_GRAPHQL_URL,
      documents: './src/graphql/**/*.graphql',
      generates: {
        [`${pwd}/src/graphql/graphql.generated.ts`]: {
          plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
          config: {
            maybeValue: ' T | null | undefined',
            avoidOptionals: false,
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
