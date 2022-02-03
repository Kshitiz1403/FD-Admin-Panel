import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import './css/Users.css'
import TemplateDataTable from "./shared/TemplateDataTable";
import { port } from "../App";

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
    table: {
        style: {
            color: '#000000',
            backgroundColor: '#000000',
        }
    },
    rows: {
        style: {
            // minHeight: '80px'
        }
    }
}

const Users = props => {

    const [users, setUsers] = useState([]);
    const [pending, setPending] = useState(true);
    const [activeUsers, setActiveUsers] = useState([])
    const [inactiveUsers, setInactiveUsers] = useState([])
    const [addedTodayUsers, setAddedTodayUsers] = useState([])

    useEffect(async () => {
        try {
            const data = await axios.get(`${port}/users`)
            setUsers(data.data)
            setPending(false)
            getActiveUsers()
            getInactiveUsers()
            getAddedToday()
            // getActiveUsers
        }
        catch (err) {
            console.error(err)
        }
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
            selector: row => `+${row.phone}`
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
            id: 'date-ordered',
            name: 'Date Ordered',
            selector: row => moment(row.dateOrdered).format('MMMM Do YYYY, h:mm:ss a'),
            sortable: true
        },
        {
            id: 'date-created',
            name: 'Date Created',
            selector: row => moment(row.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
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

    const getActiveUsers = () => {
        let active = [];
        users.map((user) => {
            if (user.active) {
                active.push(user);
            }
        });
        setActiveUsers([...active])
    }

    const getInactiveUsers = () => {
        let inactive = [];
        users.map((user) => {
            if (!user.active) {
                inactive.push(user);
            }
        });
        setInactiveUsers([...inactive])
    }

    const getAddedToday = () => {
        let addedArr = [];
        let today = new Date;
        today = moment(today).format("DD-MM-YYYY").toString();
        users.map((user) => {
            if (moment(user.createdAt).format('DD-MM-YYYY').toString() === today) {
                addedArr.push(user);
            }
        });
        setAddedTodayUsers([...addedArr])
    }

    const views = { "All": users, "Created Today": addedTodayUsers, "Active": activeUsers, "Inactive": inactiveUsers }

    return (
        <div className="Users">
            <TemplateDataTable columns={columns} views={views} loading={pending} />
        </div>

    );
};

export default Users;
