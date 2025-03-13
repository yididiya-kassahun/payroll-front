import React from "react";
import { Button, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Column } = Table;

const data = [
  {
    key: "1",
    rateName: "Night",
    overtimeRate: 1.5,
  },
  {
    key: "2",
    rateName: "Sunday",
    overtimeRate: 1.75,
  },
  {
    key: "3",
    rateName: "Weekend",
    overtimeRate: 2,
  },
  {
    key: "4",
    rateName: "Holiday",
    overtimeRate: 2.5,
  },
];

function Setting() {
  return (
    <div className="p-4 bg-gray-100 flex justify-start">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Overtime Rates
        </h2>
        <Table dataSource={data} pagination={false} bordered>
          <Column title="Rate Name" dataIndex="rateName" key="rateName" />
          <Column
            title="Overtime Rate"
            dataIndex="overtimeRate"
            key="overtimeRate"
            render={(rate) => (
              <span className="font-bold text-blue-600">{rate}</span>
            )}
          />
        </Table>
        <hr />
        <Button className="mt-10" color="default" variant="solid">
          <EditOutlined />
          Edit
        </Button>
      </div>
    </div>
  );
}

export default Setting;
