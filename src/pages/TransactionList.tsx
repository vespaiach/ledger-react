import { createRef, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Fab, Typography } from '@mui/material';
import { RemoveRounded as MinusIcon, AddRounded as PlusIcon } from '@mui/icons-material';
import List from 'react-virtualized/dist/es/List';
import WindowScroller from 'react-virtualized/dist/es/WindowScroller';
import InfiniteLoader from 'react-virtualized/dist/es/InfiniteLoader';
import AutoSizer from 'react-virtualized/dist/es/AutoSizer';
import { Index, IndexRange, ListRowRenderer } from 'react-virtualized';
import NumberFormat from 'react-number-format';
import { KeyboardArrowUpRounded as UpIcon } from '@mui/icons-material';

import { useResponsive } from '../hooks/useResponsive';
import { formatDateTime } from '../utils/date';
import { requestTransactions } from '../store/Transaction/action';
import { AppState } from '../store';
import { ScrollToTop } from '../components/ScrollToTop';
import { AppTopMenu } from '../components/AppTopMenu';
import { CommandFunc, AppCommand } from '../types';
import { PageHeader } from '../components/PageHeader';
import { pushPane } from '../store/Pane/action';
import { clearResetting } from '../store/Transaction/action/other';

const RowHeight = 61;

export function TransactionList() {
  const dispatch = useDispatch();
  const transactions = useSelector((state: AppState) => state.transaction.data);
  const resetting = useSelector((state: AppState) => state.transaction.resetting);
  const { containerGutter, theme } = useResponsive();
  const resolveLoadingData = useRef((values: unknown) => {});
  const infiniteRef = createRef<InfiniteLoader>();

  const isRowLoaded = ({ index }: Index) => {
    return !!transactions[index];
  };

  const loadMoreRows = ({ startIndex, stopIndex }: IndexRange) => {
    console.log('---', startIndex, stopIndex)
    dispatch(requestTransactions(startIndex, stopIndex));
    return new Promise((res) => {
      resolveLoadingData.current = res;
    });
  };

  const rowRenderer: ListRowRenderer = ({ index, isVisible, key, style }) => {
    const trans = transactions[index];

    if (!isVisible) {
      return null;
    }

    console.log(index)

    if (!trans) {
      return (
        <Box
          display="flex"
          alignItems="center"
          key={key}
          style={{
            ...style,
            overflow: 'hidden',
            borderTop: index > 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
          }}>
          <i>loading...</i>
        </Box>
      );
    }

    return (
      <Box
        key={key}
        display="flex"
        alignItems="center"
        width="100%"
        height={RowHeight}
        style={{
          ...style,
          overflow: 'hidden',
          borderTop: index > 0 ? '1px solid rgba(255, 255, 255, 0.12)' : 'none',
          cursor: 'pointer',
        }}
        role="button"
        onClick={() => {
          dispatch(pushPane({ name: 'TransactionDetail', state: { id: trans.id } }));
        }}
        pb={theme.spacing(1)}
        pt={theme.spacing(1)}>
        {(trans.amount || 0) > 0 ? <PlusIcon fontSize="large" /> : <MinusIcon fontSize="large" />}
        <Box ml={theme.spacing(1)} width="calc(100% - 42px)">
          <Box>
            <Typography variant="body1" component="span" mr={theme.spacing(1)}>
              {Math.abs(trans.amount)}
            </Typography>
            <Typography variant="body1" component="span" mr={theme.spacing(1)} color="text.disabled">
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
    );
  };

  const handleCommand: CommandFunc = (command) => {
    if (command === AppCommand.AddTransaction) {
      dispatch(pushPane({ name: 'TransactionForm' }));
    }
  };

  useEffect(() => {
    resolveLoadingData.current(undefined);
  }, [transactions]);

  useEffect(() => {
    dispatch(requestTransactions(0));
  }, [dispatch]);

  useEffect(() => {
    if (resetting) {
      infiniteRef.current?.resetLoadMoreRowsCache(true);
      dispatch(clearResetting());
    }
  }, [dispatch, resetting, infiniteRef]);

  return (
    <>
      <AppTopMenu onCommand={handleCommand} />
      <Container
        maxWidth="md"
        sx={{ marginTop: '78px' }}
        disableGutters={!containerGutter}
        id="back-to-top-anchor">
        <PageHeader
          text="Transactions"
          subText={
            <NumberFormat
              value={transactions.length}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'TOTAL ROW: '}
            />
          }
        />
        <InfiniteLoader
          isRowLoaded={isRowLoaded}
          loadMoreRows={loadMoreRows}
          rowCount={transactions.length}
          ref={infiniteRef}>
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer disableHeight>
              {({ width }: { width: number }) => (
                <WindowScroller>
                  {({ height, isScrolling, onChildScroll, scrollTop }) => (
                    <List
                      autoHeight
                      width={width}
                      ref={registerChild}
                      height={height}
                      isScrolling={isScrolling}
                      onScroll={onChildScroll}
                      scrollTop={scrollTop}
                      rowRenderer={rowRenderer}
                      rowHeight={RowHeight}
                      rowCount={transactions.length}
                      onRowsRendered={onRowsRendered}
                      style={{ outline: 'none' }}
                    />
                  )}
                </WindowScroller>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </Container>
      <ScrollToTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <UpIcon />
        </Fab>
      </ScrollToTop>
    </>
  );
}
