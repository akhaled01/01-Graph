import { GetProjectStats, columns } from "@/logic/graphql/apollo/projects";
import React from "react";
import { DataTable } from "./datatable";

const ProjectTable = async () => {
  const data = await GetProjectStats();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data!} />
    </div>
  );
};

export default ProjectTable;
