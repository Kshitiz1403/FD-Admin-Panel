import React from "react";
import styled from "styled-components";
import magnifyingGlass from "../assets/magnifying-glass.png"

const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.small ? 5 : undefined
}))`
  height: 32px;
  width: 500px;
  // border-radius: 3px;
  // border-top-left-radius: 5px;
  // border-bottom-left-radius: 5px;
  // border-top-right-radius: 0;
  // border-bottom-right-radius: 0;
  // border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputContainer = styled.div`
  display:flex,

`

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <div style={{ display: 'flex', flexDirection: 'row', left: 15, position: 'absolute', }}>
    <div style={{ display: 'flex' }}>
      <img src={magnifyingGlass} style={{width:50, height:50}}/>
      {/* <div style={{ width: '100%', height: '100%', backgroundColor: 'red' }}></div> */}
      <Input
        id="search"
        type="text"
        placeholder="Search users"
        value={filterText}
        onChange={onFilter}
      />
    </div>
    <ClearButton onClick={onClear}>X</ClearButton>
  </div>
);

export default FilterComponent;
