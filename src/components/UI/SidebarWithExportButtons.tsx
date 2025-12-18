import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import SidebarContent from "@/components/UI/SidebarContent";
import ExportButtons from "@/components/UI/ExportButtons";

interface SidebarWithExportButtonsProps {
  username: string;
  data: GitHubWrappedData;
  onBackClick: () => void;
}

const SidebarWithExportButtons: React.FC<SidebarWithExportButtonsProps> = ({
  username,
  data,
  onBackClick
}) => {
  return (
    <div className="fixed left-4 top-4 z-50 flex flex-col gap-4 w-64 max-w-xs">
      <SidebarContent username={username} onBackClick={onBackClick} />
      <ExportButtons data={data} />
    </div>
  );
};

export default SidebarWithExportButtons;