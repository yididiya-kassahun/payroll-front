// Setting component
import React, { useState } from "react";
import { Button, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { fetchRates } from "../../services/settingService";
import { useQuery } from "@tanstack/react-query";
import EditRate from "./EditRate"; // Import the EditRate component

const { Column } = Table;

function Setting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["rates"],
    queryFn: () => fetchRates(),
    keepPreviousData: true,
    staleTime: 5000,
  });

  const dataSource = data?.data?.map((rate) => ({
    key: rate.id,
    Rate_Name: rate.Rate_Name,
    Overtime_Rate: rate.Overtime_Rate,
    ...rate, // Spread the entire rate object for later use
  }));

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="p-4 bg-gray-100 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Overtime Rates
        </h2>
        <Table
          dataSource={dataSource}
          loading={isLoading}
          pagination={false}
          bordered
        >
          <Column title="Rate Name" dataIndex="Rate_Name" key="Rate_Name" />
          <Column
            title="Overtime Rate"
            dataIndex="Overtime_Rate"
            key="Overtime_Rate"
            render={(rate) => (
              <span className="font-bold text-blue-600">{rate}</span>
            )}
          />
          <Column
            title="Action"
            key="action"
            render={(_, record) => (
              <Button
                color="default"
                variant="solid"
                onClick={() => showModal(record)}
                icon={<EditOutlined />}
              >
                Edit
              </Button>
            )}
          />
        </Table>

        <EditRate
          open={isModalOpen}
          onClose={handleCancel}
          record={selectedRecord}
          refetch={refetch}
        />
      </div>
    </div>
  );
}

export default Setting;
