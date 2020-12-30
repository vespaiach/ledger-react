import { useMemo } from 'react';

export default function useColumnDefs(desktopColDefs, mobileColDefs, mobile, orderField, orderDirection) {
    return useMemo(() => {
        return (mobile ? mobileColDefs : desktopColDefs).map((c) => {
            if (c.dataKey === orderField) {
                return {
                    ...c,
                    direction: orderDirection,
                };
            }
            return c;
        });
    }, [orderField, orderDirection, mobile, desktopColDefs, mobileColDefs]);
}
