import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import EditAllowance from "./EditAllowance";
import AddAllowance from "./AddAllowance";
import { deleteAllowance, fetchAllowance } from "../../services/employeeService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "../../config";

const { Column } = Table;

function Allowance() {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [selectedAllowance, setSelectedAllowance] = useState(null);
  const [employeeTinNumbers, setEmployeeTinNumbers] = useState([]); // State to hold TIN numbers

  const token = localStorage.getItem("authToken");

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["allowance"],
    queryFn: () => fetchAllowance(),
    keepPreviousData: true,
    staleTime: 5000,
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/employees`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        const result = await response.json();

        if (result?.employees) {
          const tinNumbers = result.employees.map((emp) => emp.Employee_TIN);
          const uniqueTinNumbers = [...new Set(tinNumbers)];
          setEmployeeTinNumbers(uniqueTinNumbers);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Mutation to delete the employee
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteAllowance(id),
    onSuccess: () => {
      message.success("Allowance deleted successfully!");
      refetch();
      setIsDeleteModalOpen(false);
    },
    onError: (error) => {
      message.error(`Failed to delete Allowance: ${error.message}`);
      setIsDeleteModalOpen(false);
    },
  });

  const showAddModal = () => {
    setIsModalOpen(true);
  };

  const handleAddOk = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleAddCancel = () => {
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

  const handleDeleteOk = async () => {
    console.log("Deleting allowance with ID:", recordToDelete.id);
    setIsDeleteModalOpen(false);
    setRecordToDelete(null);
    refetch();
  };

  const showEditDrawer = (record) => {
    setSelectedAllowance(record);
    setOpenEditModal(true);
  };

  const closeEditDrawer = () => {
    setOpenEditModal(false);
    setSelectedAllowance(null);
  };

  const dataSource = data?.allowances?.map((allowance) => ({
    key: allowance.id,
    tinNumber: allowance.employee_tin,
    name: allowance.Employee_Name,
    Non_Taxable_Allowance: allowance.non_taxable_allowance,
    Taxable_Allowance: allowance.taxable_allowance,
    Overtime_Hours: allowance.overtime_hours,
    Sales_Commission_Allowance: allowance.sales_commission_allowance,
    Night_Working_Hours: allowance.night_working_hours,
    Sunday_Working_Hours: allowance.sunday_working_hours,
    Holiday_Working_Hours: allowance.holiday_working_hours,
  }));

  return (
    <>
      <h2 className="text-xl text-semibold mb-4">Employee Allowance</h2>
      <hr />
      <div className="flex justify-end mt-5">
        <Button
          className="text-white py-5"
          style={{ backgroundColor: "#001529" }}
          onClick={showAddModal}
        >
          + Add Employee Allowance
        </Button>
      </div>
      <div className="bg-white shadow-md mt-10">
        <Table dataSource={dataSource}>
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
                  onClick={() => showEditDrawer(record)}
                  className="w-full md:w-auto bg-purple-500 text-white"
                >
                  <CheckCircleOutlined />
                  Edit
                </Button>
                <Button
                  color="danger"
                  style={{ color: "red" }}
                  onClick={() => showDeleteModal(record)}
                  className="w-full md:w-auto bg-danger-200 text-white"
                >
                  <DeleteOutlined />
                </Button>
              </div>
            )}
          />
        </Table>
      </div>
      <EditAllowance
        open={openEditModal}
        onClose={closeEditDrawer}
        allowanceData={selectedAllowance}
        refetch={refetch}
      />
      <AddAllowance
        isModalOpen={isModalOpen}
        handleOk={handleAddOk}
        handleCancel={handleAddCancel}
        tinNumbers={employeeTinNumbers}
      />
      <Modal
        title="Delete"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete the employee allownance ?</p>
      </Modal>
    </>
  );
}

export default Allowance;
