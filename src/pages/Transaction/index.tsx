import { Box, Container } from '@mui/material';

import { Master } from '../Master';

export function List() {
  return (
    <Master>
      <Container maxWidth="md" disableGutters sx={{ marginTop: '78px' }}>
        <Box sx={{ my: 2 }}>
          {[...new Array(112)]
            .map(
              (_, i) => `${i}.Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
            )
            .join('\n')}
        </Box>
      </Container>
    </Master>
  );
}
