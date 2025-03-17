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
import { useQuery } from "@tanstack/react-query";

import { fetchEmployees } from "../../services/employeeService";

const { Column } = Table;

function Employee() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const navigate = useNavigate();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["employees"],
    queryFn: () => fetchEmployees(),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const showDrawer = (record) => {
    setOpen(true);
    setSelectedRecord(record);
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

  const dataSource = data?.employees?.map((employee) => ({
    key: employee.id,
    tinNumber: employee.Employee_TIN,
    email: employee.Employee_Email,
    name: employee.Employee_Name,
    salary: employee.Basic_Salary,
    bankAccount: employee.Bank_Account,
    Penality: employee.Penalty,
    Number_of_Working_Days: employee.Number_of_Working_Days,
  }));

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
        <Table dataSource={dataSource}>
          <Column
            title="Employee Name"
            dataIndex="name"
            key="name"
            render={(name) => <a>{name}</a>}
          />
          <Column title="Tin Number" dataIndex="tinNumber" key="tinNumber" />

          <Column title="Salary" dataIndex="salary" key="salary" />
          <Column title="Bank Acc." dataIndex="bankAccount" key="bankAccount" />
          <Column title="Penality" dataIndex="Penality" key="Penality" />
          <Column
            title="Number of Working Days"
            dataIndex="Number_of_Working_Days"
            key="Number_of_Working_Days"
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  type="default"
                  onClick={() =>
                    navigate(`/payroll/${record.tinNumber}`, { state: { record } })
                  }
                  className="w-full md:w-auto"
                >
                  <EyeOutlined />
                  View
                </Button>
                <Button
                  type="primary"
                  onClick={() => showDrawer(record)}
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
      {selectedRecord && (
        <EditEmployee
          open={open}
          onClose={() => setOpen(false)}
          record={selectedRecord}
        />
      )}
      ;
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
