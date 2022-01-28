import DataTable from 'react-data-table-component';
import React, {useState } from 'react';

const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true
    },
    {
        name: 'Phone',
        selector: row => row.phone,
        sortable: true
    },
    {
        name: 'Orders',
        selector: row => row.orders,
        sortable: true
    },
    {
        name: 'Spent',
        selector: row => row.spent,
        sortable: true
    },
    {
        name: 'Actions',
        selector: row => row.actions,
        sortable: true
    },

];

const data = [
    {
        id: 1,
        name: 'Beetlejuice',
        phone: '9196104565',
        orders: '1',
        spent: 'rs1234',
        actions: 'b1b2'
    },
    {
        id: 2,
        name: 'Ghostbusters',
        phone: '9196104562',
        orders: '2',
        spent: 'rs1235',
        actions: 'b1b21'
    },
]

export default function MyComponent() {

        const [filterText, setFilterText] = React.useState('');
        const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
        const filteredItems = fakeUsers.filter(
            item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
        );
    
        const subHeaderComponentMemo = React.useMemo(() => {
            const handleClear = () => {
                if (filterText) {
                    setResetPaginationToggle(!resetPaginationToggle);
                    setFilterText('');
                }
            };
    
            return (
                <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
            );
        }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={columns}
            data={data}
            selectableRows
            pagination
        />
    );
};