import React, { useMemo, useState } from 'react';
import DataTable from "react-data-table-component";
import FilterComponent from "../FilterComponent";

const TemplateDataTable = (props) => {

    let columns = props.columns
    const views = props.views
    let loading = props.loading

    // Gives an array of keys
    let keys = Object.keys(views)

    const [filterText, setFilterText] = useState("");
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [processedData, setProcessedData] = useState([...views[keys[0]]]);
    const [activeView, setActiveView] = useState(keys[0])

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

    const ActiveViews = () => {
        return (
            <div style={{ display: 'flex', justifyContent: 'space-evenly', backgroundColor: 'red' }}>
                {keys.map(key => <div style={{ backgroundColor: activeView == key ? 'blue' : null, cursor:'pointer' }} onClick={() => {
                    setActiveView(key)
                    setProcessedData(views[key])
                }}>{key}</div>)}
            </div>)
    }

    return (
        <div >
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
                progressPending={loading}
                theme="dark"
            // customStyles={customStyles}
            />
        </div>

    );
};

export default TemplateDataTable;
