import React, { useState, useEffect } from "react";
import { Form, InputNumber, message, Drawer, Button } from "antd";
import { editAllowance } from "../../services/employeeService";
import { useMutation } from "@tanstack/react-query";

const EditAllowance = ({ open, onClose, allowanceData, refetch }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  console.log("allowanceData ", allowanceData);

  const mutation = useMutation({
    mutationFn: editAllowance,
    onSuccess: () => {
      message.success("Allowance record updated successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      message.error(`Failed to update Allowance: ${error.message}`);
    },
  });

  useEffect(() => {
    if (allowanceData) {
      form.setFieldsValue({
        non_taxable_allowance: allowanceData.Non_Taxable_Allowance,
        taxable_allowance: allowanceData.Taxable_Allowance,
        overtime_hours: allowanceData.Overtime_Hours,
        sales_commission_allowance: allowanceData.Sales_Commission_Allowance,
        night_working_hours: allowanceData.Night_Working_Hours,
        sunday_working_hours: allowanceData.Sunday_Working_Hours,
        holiday_working_hours: allowanceData.Holiday_Working_Hours,
      });
    }
  }, [allowanceData, form]);

  const onFinish = async (values) => {
    setLoading(true);
    mutation.mutate({
      employee_tin: allowanceData?.tinNumber, 
      ...values,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Drawer
      width={500}
      title="Edit Allowance Record"
      onClose={onClose}
      open={open}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="mt-4"
      >
        <Form.Item
          label="Non Taxable Allowance"
          name="non_taxable_allowance"
          rules={[
            {
              required: true,
              message: "Please input the non-taxable allowance!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Non Taxable Allowance"
            // value={allowanceData.non_taxable_allowance}
          />
        </Form.Item>

        <Form.Item
          label="Taxable Allowance"
          name="taxable_allowance"
          rules={[
            { required: true, message: "Please input the taxable allowance!" },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Taxable Allowance"
            // value={allowanceData.taxable_allowance}
          />
        </Form.Item>

        <Form.Item
          label="Overtime Hours"
          name="overtime_hours"
          rules={[{ required: true, message: "Please input overtime hours!" }]}
        >
          <InputNumber className="w-full" placeholder="Overtime Hours" />
        </Form.Item>

        <Form.Item
          label="Sales Commission Allowance"
          name="sales_commission_allowance"
          rules={[
            {
              required: true,
              message: "Please input sales commission allowance!",
            },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Sales Commission Allowance"
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Night Working Hours"
          name="night_working_hours"
          rules={[
            {
              required: true,
              message: "Please input night working hours!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Night Working Hours" />
        </Form.Item>

        <Form.Item
          label="Sunday Working Hours"
          name="sunday_working_hours"
          rules={[
            {
              required: true,
              message: "Please input sunday working hours!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Sunday Working Hours" />
        </Form.Item>

        <Form.Item
          label="Holiday Working Hours"
          name="holiday_working_hours"
          rules={[
            {
              required: true,
              message: "Please input holiday working hours!",
            },
          ]}
        >
          <InputNumber className="w-full" placeholder="Holiday Working Hours" />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-10">
          <Button onClick={onClose} className="py-6 px-8">
            Cancel
          </Button>
          <Button
            color="default"
            variant="solid"
            type="primary"
            className="py-6 px-8"
            htmlType="submit"
          >
            Update
          </Button>
        </div>
      </Form>
    </Drawer>
  );
};

export default EditAllowance;
