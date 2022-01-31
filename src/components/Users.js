import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import moment from "moment";
import FilterComponent from "./FilterComponent";
// import users from './Data.js'

import './css/Users.css'

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

const customStyles = {
    table:{
        style:{
            color: '#000000',
            backgroundColor: '#000000',
        }
    },
    rows:{
        style:{
            // minHeight: '80px'
        }
    }
}

const Users = props => {

    const [activeView, setActiveView] = useState('all');
    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [users, setUsers] = useState([]);
    const [processedData, setProcessedData] = useState([]);
    const [pending, setPending] = useState(true);

    const port = "https://apifd.herokuapp.com";
    
    useEffect(() => {
      axios.get(`${port}/users`).then(data => {
          setUsers([...data.data])
          setProcessedData([...data.data])
          setPending(false)
        }).catch(err => console.log(err));
    }, []);

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


    const getAllUsers = () => {
        setProcessedData([...users])
    }

    const getActiveUsers = () => {
        let active = [];
        users.map((user) => {
            if (user.active) {
                active.push(user);
            }
        });
        setProcessedData([...active])
    }

    const getInactiveUsers = () => {
        let inactive = [];
        users.map((user) => {
            if (!user.active) {
                inactive.push(user);
            }
        });
        setProcessedData([...inactive])
    }

    const getAddedToday = () => {
        let added = [];
        let today = new Date;
        today = moment().format("DD-MM-YYYY");
        users.map((user) => {
            if (user.added === today) {
                added.push(user);
            }
        });
        setProcessedData([...added])
    }

    const activeViewHandler = (view) => {
        setActiveView(view)
        if (view === 'all') {
            getAllUsers()
        }
        if (view === 'activeUsers') {
            getActiveUsers()
        }

        if (view === 'inactiveUsers') {
            getInactiveUsers()
        }
        if (view === 'addedToday') {
            getAddedToday()
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
        <div className="Users">
            <ActiveViews />
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
                selectableRows
                progressPending={pending}
                theme="dark"
                customStyles={customStyles}
            />
        </div>

    );
};

export default Users;
