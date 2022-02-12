import styled from "styled-components";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

export const WrapperTabs = styled(Tabs)`
  font-size: 16px;
  width: 100%;
  margin-top: 10px;
`;

export const WrapperTabList = styled(TabList)`
  list-style-type: none;
  padding: 4px;
  display: flex;
  margin: 0;
`;
WrapperTabList.tabsRole = "TabList";

export const WrapperTab = styled(Tab)`
  border-radius: 16px;
  border: 2px solid #ccc;
  border-color: #a11326;
  padding: 16px;
  user-select: none;
  cursor: pointer;
  z-index: 99999;
  background-color: "#fff";
  margin: 8px;
  color: #a11326;
  font-weight: bold;
  &:focus {
    outline: none;
  }
  &.is-selected {
    box-shadow: 8px 8px 6px #a11326;
  }
`;
WrapperTab.tabsRole = "Tab";

export const WrapperTabPanel = styled(TabPanel)`
  padding: 16px;
  border: 1px solid "#ccc";
  display: none;
  text-align: center;
  span {
    font-size: 20px;
    color: #a11326;
    font-weight: bold;
  }
  &.is-selected {
    display: block;
  }
`;
WrapperTabPanel.tabsRole = "TabPanel";

export const WrapperList = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  flex-wrap: wrap;
`;

export const WrapperButton = styled.button`
  font-size: 28px;
  margin-left: 10px;
  &:hover {
    color: #f25e5e;
  }
`