import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";  // Eksik importlar eklendi
import { useState } from "react";
import AssetsMenuContent from "./AssetsMenuContent";
import ObjectsMenuContent from "./ObjectsMenuContent";
import { styled } from "@mui/material/styles";

const CustomTab = styled(Tab)(({ theme }) => ({
  textTransform: "none", // Büyük harf olmasını engeller
  fontSize: "14px",
  fontWeight: "500",
  color: "#AAA", // Pasif tab rengi
  minWidth: 0,
  padding: "6px 16px",
  borderRadius: "16px", // Köşeleri yuvarlatır
  "&.Mui-selected": {
    backgroundColor: "#FFFFFF1A", // Aktif tab rengi
    color: "#FFF", // Aktif tab yazı rengi
  },
  width: "50%",
  marginBottom: "10px",
}));

const CustomTabs = styled(Tabs)({
  padding: "10px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#AAA", // Alt çizgi rengi
    height: "2px",
    borderRadius: "2px",
  },
});

const menuContents = [
  {
    title: "Objects",
    content: <ObjectsMenuContent />,
  },
  {
    title: "Assets",
    content: <AssetsMenuContent />,
  },
];

const Sidebar = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        m: 2,
        left: 0, // Sidebar'ı sol üst köşeye sabitle
        zIndex: 1, // Üstte görünmesini sağla
        width: 220,
        bgcolor: "#000000CC",
        borderRadius: 4,
        minHeight: "96vh"
      }}
    >
      <TabContext value={tabValue.toString()}> {/* `value` string olmalı */}
        <CustomTabs value={tabValue} onChange={handleTabChange}>
          {menuContents.map((menuContent, index) => (
            <CustomTab key={index} label={menuContent.title} />
          ))}

          <CustomTab label="Assets" />
        </CustomTabs>


        {menuContents.map((menuContent, index) => (
          <TabPanel key={index} value={index.toString()} sx={{ p: 0 }}>
            {menuContent.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};

export default Sidebar;
