import React from "react";
import { Table, Tag, Button } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";

const { Column } = Table;

const data = [
  {
    key: "1",
    tinNumber: "31231",
    name: "John Brown",
    salary: 3200,
    bankAccount: "New York No. 1 Lake Park",
    deductionStartDate: "12/04/2025",
    deductionEndDate: "23/05/2025",
  },
  {
    key: "2",
    tinNumber: "6343",
    name: "John Brown",
    salary: 3200,
    bankAccount: "New York No. 1 Lake Park",
    deductionStartDate: "12/04/2025",
    deductionEndDate: "23/05/2025",
  },
  {
    key: "3",
    tinNumber: "4235",
    name: "John Brown",
    salary: 3200,
    bankAccount: "100012312312",
    deductionStartDate: "12/04/2025",
    deductionEndDate: "23/05/2025",
  },
];

const Employee = () => (
  <>
    <h2 className="text-xl text-semibold">Employee Management</h2>
    <div className="bg-white shadow-md mt-10">
      <Table dataSource={data}>
        <Column
          title="Full Name"
          dataIndex="name"
          key="name"
          render={(name) => <a>{name}</a>}
        />
        <Column title="Tin Number" dataIndex="tinNumber" key="tinNumber" />

        <Column title="Salary" dataIndex="salary" key="salary" />
        <Column title="Bank Acc." dataIndex="bankAccount" key="bankAccount" />
        <Column
          title="Deduction Start Date"
          dataIndex="deductionStartDate"
          key="deductionStartDate"
        />
        <Column
          title="Deduction End Date"
          dataIndex="deductionEndDate"
          key="deductionEndDate"
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <div className="flex flex-col md:flex-row gap-2">
              <Button
                type="default"
                // onClick={() => handleViewDetail(record)}
                className="w-full md:w-auto"
              >
                <EyeOutlined />
                View
              </Button>
              <Button
                type="primary"
                // onClick={() => handleApproval(record)}
                className="w-full md:w-auto bg-purple-500 text-white"
              >
                <CheckCircleOutlined />
                Edit
              </Button>
              <Button
                color="danger"
                style={{ color: "red" }}
                // onClick={() => showDeleteModal(record)}
                className="w-full md:w-auto bg-danger-200 text-white"
              >
                <DeleteOutlined />
              </Button>
            </div>
          )}
        />
      </Table>
    </div>
  </>
);

export default Employee;
