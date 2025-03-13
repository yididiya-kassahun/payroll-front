import React, { useState } from "react";
import { Table, Tag, Button, Modal } from "antd";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import EditAllowance from "./EditAllowance";
import AddAllowance from "./AddAllowance";

const { Column } = Table;

function Allowance() {
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);

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
      Non_Taxable_Allowance: "3200",
      Taxable_Allowance: "10",
      Overtime_Hours: "54",
      Sales_Commission_Allowance: "1200",
      Night_Working_Hours: "32",
      Sunday_Working_Hours: "12",
      Holiday_Working_Hours: "2",
    },
    {
      key: "2",
      tinNumber: "31231",
      name: "John Brown",
      Non_Taxable_Allowance: "3200",
      Taxable_Allowance: "10",
      Overtime_Hours: "54",
      Sales_Commission_Allowance: "1200",
      Night_Working_Hours: "32",
      Sunday_Working_Hours: "12",
    },
    {
      key: "3",
      tinNumber: "31231",
      name: "John Brown",
      Non_Taxable_Allowance: "3200",
      Taxable_Allowance: "10",
      Overtime_Hours: "54",
      Sales_Commission_Allowance: "1200",
      Night_Working_Hours: "32",
      Sunday_Working_Hours: "12",
    },
  ];

  return (
    <>
      <h2 className="text-xl text-semibold mb-4">Employee Allowance</h2>
      <hr />
      <div className="flex justify-end mt-5">
        <Button
          className="text-white py-5"
          style={{ backgroundColor: "#001529" }}
          onClick={showModal}
        >
          + Add Employee Allowance
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

          <Column
            title="Non Taxable Allowance"
            dataIndex="Non_Taxable_Allowance"
            key="Non_Taxable_Allowance"
          />
          <Column
            title="Taxable Allowance"
            dataIndex="Taxable_Allowance"
            key="Taxable_Allowance"
          />
          <Column
            title="Overtime Hours"
            dataIndex="Overtime_Hours"
            key="Overtime_Hours"
          />
          <Column
            title="Sales Commission Allowance"
            dataIndex="Sales_Commission_Allowance"
            key="Sales_Commission_Allowance"
          />
          <Column
            title="Night Working Hours"
            dataIndex="Night_Working_Hours"
            key="Night_Working_Hours"
          />
          <Column
            title="Sunday Working Hours"
            dataIndex="Sunday_Working_Hours"
            key="Sunday_Working_Hours"
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <div className="flex flex-col md:flex-row gap-2">
                <Button
                  type="primary"
                  onClick={showDrawer}
                  className="w-full md:w-auto bg-purple-500 text-white"
                >
                  <CheckCircleOutlined />
                  Edit
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
      <EditAllowance open={open} onClose={() => setOpen(false)} />
      <AddAllowance
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
        <p>Are you sure you want to delete the employee allownance ?</p>
      </Modal>
    </>
  );
}

export default Allowance;
