import React, { useState } from "react";
import { Table, Tag, Button, Modal } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import EditEmployee from "./EditEmployee/EditEmployee";
import AddEmployee from "./AddEmployee/AddEmployee";

const { Column } = Table;

function Employee() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDeleteModal = (record) => {
    setRecordToDelete(record);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
  };

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

  return (
    <>
      <h2 className="text-xl text-semibold mb-4">Employee Management</h2>
      <hr />
      <div className="flex justify-end mt-5">
        <Button
          className="text-white py-5"
          style={{ backgroundColor: "#001529" }}
          onClick={showModal}
        >
          + Add Employee
        </Button>
      </div>
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
                  onClick={() => navigate("/payroll/1")}
                  className="w-full md:w-auto"
                >
                  <EyeOutlined />
                  View
                </Button>
                <Button
                  type="primary"
                  onClick={showDrawer}
                  className="w-full md:w-auto bg-purple-500 text-white"
                >
                  <CheckCircleOutlined />
                  Edit
                </Button>
                <Button
                  type="default"
                  // onClick={() => handleViewDetail(record)}
                  className="w-3 md:w-auto"
                >
                  <HolderOutlined />
                  Hold
                </Button>
                <Button
                  color="danger"
                  style={{ color: "red" }}
                  onClick={() => showDeleteModal()}
                  className="w-full md:w-auto bg-danger-200 text-white"
                >
                  <DeleteOutlined />
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
      <EditEmployee open={open} onClose={() => setOpen(false)} />
      <AddEmployee
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <Modal
        title="Delete"
        open={isDeleteModalOpen}
        // onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete the employee ?</p>
      </Modal>
    </>
  );
}

export default Employee;
