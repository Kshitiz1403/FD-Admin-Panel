import React from "react";
import colors from '../constants/colors'
import { BsSearch, BsFillXCircleFill } from "react-icons/bs";

const container = {
  position: "absolute",
  left: 15,
  width: '100%'
}
const containerStyles = {
  display: "flex",
  flexDirection: "row",
  width: '60%',
  height: 50
}
const inputContainerStyles = {
  display: "flex",
  width: '100%',
  backgroundColor: colors.dark,
  borderRadius: 8,
  borderColor: colors.grey,
  borderWidth: 2,
  borderStyle: 'solid',
  justifyContent: 'center',
  alignItems: 'center',
  paddingLeft: 20
}

const inputStyles = {
  width: '100%',
  backgroundColor: "inherit",
  border: 0,
  color: colors.text.primary,
  outline: "none",
  fontSize: 15
}

const Input = ({ filterText, onFilter, onClear }) => (
  <div style={containerStyles}>
    <div style={inputContainerStyles}>
      <BsSearch size={20} style={{ marginRight: 15 }} />
      <input style={inputStyles} placeholder="Search users" value={filterText} onChange={onFilter} type="text" id="search" />
      {filterText ?
        <BsFillXCircleFill size={20} style={{ marginRight: 10, cursor: "pointer" }} onClick={onClear} /> : null}
    </div>
  </div>)

const SortBy = () => (
  <div style={{ marginLeft: 20, width: '30%' }}>
    <div style={{ position: 'absolute', top: -9, marginLeft: 20 }}>Sort By</div>
    <div style={{ backgroundColor: colors.dark, height: 50, borderRadius: 8, borderColor: colors.grey, borderWidth: 2, borderStyle: 'solid', }}>
    </div>
  </div>
)

const FilterComponent = ({ filterText, onFilter, onClear }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', ...container }}>
      <Input filterText={filterText} onFilter={onFilter} onClear={onClear} />
      <SortBy />
    </div>
  )
}

export default FilterComponent;
