import { AutoSizer, Table, Column } from 'react-virtualized';

const rows = 'Below is a simple List example. Each row in the virtualized list is rendered through the use of a rowRenderer function for performance reasons. This function must return an element that has a unique key, applies the style and has content fitting within rowHeight.'
    .split(' ')
    .map((name) => ({ name }));

console.log(rows);

function VirtualTable() {
    return (
        <AutoSizer>
            {({ width, height }) => (
                <Table
                    width={width}
                    height={height}
                    headerHeight={48}
                    rowHeight={30}
                    rowCount={rows.length}
                    rowGetter={({ index }) => rows[index]}
                >
                    <Column label="Name" dataKey="name" width={100} />
                </Table>
            )}
        </AutoSizer>
    );
}

export default VirtualTable;
