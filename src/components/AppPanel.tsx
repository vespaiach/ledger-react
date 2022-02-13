import { Container } from '@mui/material';
import { ReactNode } from 'react';

export default function AppPanel({ id = 'back-to-top', children }: { id?: string; children: ReactNode }) {
  return (
    <Container maxWidth="md" id={id} sx={{ mt: 3, mb: 8 }}>
      {children}
    </Container>
  );
}
