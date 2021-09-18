import { Box, Container, Divider, Typography } from '@mui/material';
import { RemoveRounded as MinusIcon, AddRounded as PlusIcon } from '@mui/icons-material';

import { useResponsive } from '../../hooks/useResponsive';
import { TransactionModel } from '../../types';

import { Master } from '../Master';
import { formatDateTime } from '../../utils/date';

const list: TransactionModel[] = [
  {
    id: 1,
    amount: 19000,
    date: new Date(),
    description: 'test',
    updatedAt: new Date(),
    reason: {
      id: 2,
      text: 'do you know the muffin man?do you know the muffin man?do you know the muffin man?do you know the muffin man?',
      updatedAt: new Date(),
    },
  },
  {
    id: 2,
    amount: 19000,
    date: new Date(),
    description: 'test',
    updatedAt: new Date(),
    reason: {
      id: 2,
      text: 'Test reason',
      updatedAt: new Date(),
    },
  },
];

export function List() {
  const { containerGutter, theme } = useResponsive();

  return (
    <Master>
      <Container maxWidth="md" sx={{ marginTop: '78px' }} disableGutters={!containerGutter}>
        {list.map((trans, i) => {
          const isLast = i + 1 === list.length;

          return (
            <div key={trans.id}>
              <Box
                display="flex"
                key={trans.id}
                alignItems="center"
                mb={isLast ? 0 : theme.spacing(1)}
                width="100%"
                sx={{ overflow: 'hidden' }}
                role="button"
                onClick={() => console.log('a')}
              >
                {(trans.amount || 0) > 0 ? (
                  <PlusIcon fontSize="large" />
                ) : (
                  <MinusIcon fontSize="large" />
                )}
                <Box ml={theme.spacing(1)} width="calc(100% - 42px)">
                  <Box>
                    <Typography variant="body1" component="span" mr={theme.spacing(1)}>
                      {trans.amount}
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      mr={theme.spacing(1)}
                      color="text.disabled"
                    >
                      |
                    </Typography>
                    <Typography variant="body1" component="span" color="text.disabled">
                      {formatDateTime(trans.date)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" component="p" color="text.disabled" noWrap>
                    {trans.reason?.text}
                  </Typography>
                </Box>
              </Box>
              {!isLast && <Divider sx={{ marginBottom: theme.spacing(1) }} />}
            </div>
          );
        })}
      </Container>
    </Master>
  );
}
