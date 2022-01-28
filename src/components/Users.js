import React, { useMemo, useState } from "react";

import DataTable from "react-data-table-component";
import FilterComponent from "./FilterComponent";

import data from './Data.js'

const NameDetails = ({ name, email }) => (
    <>
        <div>
            {name ? name : "No Name"}
        </div>
        <div>
            {email ? email : "No Email"}
        </div>
    </>
);

const Users = props => {
    const columns = [
        {
            id: 'name',
            name: 'Name',
            selector: row => <NameDetails name={row.name} email={row.email} />,
        },
        {
            id: 'phone',
            name: 'Phone',
            selector: row => row.phone
        },
        {
            id: 'orders',
            name: 'Orders',
            selector: row => row.orders,
            sortable: true
        },
        {
            id: 'spent',
            name: 'Spent',
            selector: row => row.spent,
            sortable: true
        },
        {
            id: 'date-signed-in',
            name: 'Date Signed In',
            selector: row => row.dateSignedIn,
            sortable: true
        },
        {
            id: 'date-ordered',
            name: 'Date Ordered',
            selector: row => row.dateOrdered,
            sortable: true
        },
        {
            id: 'date-created',
            name: 'Date Created',
            selector: row => row.dateCreated,
            sortable: true
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <button onClick={() => props.click(row.name)} style={{ marginRight: "5px" }}>
                        Edit
                    </button>

                    <button onClick={() => props.click(row.name)}>
                        View
                    </button>
                </>
            )
        }
    ];


    const [activeView, setActiveView] = useState('all')
    const [filterText, setFilterText] = React.useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
        false
    );
    const [processedData, setProcessedData] = useState([...data])
    const filteredItems = processedData.filter(
        item =>
            JSON.stringify(item)
                .toLowerCase()
                .indexOf(filterText.toLowerCase()) !== -1
    );

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };

        return (
            <FilterComponent
                onFilter={e => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const getActiveUsers = () => {
        let active = [];
        data.map((user) => {
            if (user.active) {
                active.push(user);
            }
        });
        setProcessedData([...active])
        console.log(processedData)
    }
    const getAllUsers = () =>{
        setProcessedData([...data])
    }

    const activeViewHandler = (view) => {
        setActiveView(view)
        console.log(view)
        if (view=='activeUsers'){
            getActiveUsers()
        }
        if (view=='all'){
            getAllUsers()
        }
    }

    const ActiveViews = () => (
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={{ backgroundColor: activeView === 'all' ? 'red' : null }} onClick={() => activeViewHandler('all')}>All</div>
            <div style={{ backgroundColor: activeView === 'activeUsers' ? 'red' : null }} onClick={() => activeViewHandler('activeUsers')}>Active</div>
            <div style={{ backgroundColor: activeView === 'inactiveUsers' ? 'red' : null }} onClick={() => activeViewHandler('inactiveUsers')}>Inactive</div>
            <div style={{ backgroundColor: activeView === 'addedToday' ? 'red' : null }} onClick={() => activeViewHandler('addedToday')}>Added Today</div>
        </div>
    )

    return (
        <>
            <ActiveViews/>
            <DataTable
                title="Contact List"
                columns={columns}
                data={filteredItems}
                defaultSortFieldId={'date-ordered'}
                striped
                pagination
                subHeader
                subHeaderComponent={subHeaderComponent}
                fixedHeader={true}
                fixedHeaderScrollHeight="400px"
                selectableRows
            />
        </>

    );
};

export default Users;
