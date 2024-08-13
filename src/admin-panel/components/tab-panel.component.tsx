import { Box } from "@mui/material";
import { ReactNode } from "react";

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    activeTab: number;
}

export const TabPanel = ({children, index, activeTab, ...other}: TabPanelProps) => {

    return (
        <div
            role="tabpanel"
            hidden={activeTab !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {activeTab === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}