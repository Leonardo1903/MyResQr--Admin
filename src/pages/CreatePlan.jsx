import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select";
import { useToast } from "../hooks/use-toast";

export default function CreatePlan() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { toast } = useToast();
  const accessToken = sessionStorage.getItem("accessToken");
  
  const [plan, setPlan] = useState({
    id: "",
    period: "",
    item: {
      name: "",
      amount: 0,
      currency: "INR",
      description: "",
      tax_inclusive: false,
    },
    notes: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, period, ...planData } = plan;
    planData.id = id;
    planData.period = period; 
    console.log("Submitted plan:", planData);

    try {
      const response = await axios.post(
        `${baseUrl}/pin_manager/create_plan`,
        planData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setPlan({
        id: "",
        period: "",
        item: {
          name: "",
          amount: 0,
          currency: "INR",
          description: "",
          tax_inclusive: false,
        },
      })
      toast({
        title: "Plan Created",
        description: "Plan created successfully",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Plan Creation Failed",
        description: "Plan creation failed. Please try again",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlan((prevPlan) => ({
      ...prevPlan,
      [name]: type === "checkbox" ? checked : value,
      item: {
        ...prevPlan.item,
        [name]: type === "number" ? Number.parseFloat(value) : value,
      },
    }));
  };

  const handlePeriodChange = (value) => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      period: value,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create Plan</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Plan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="id">Plan ID</Label>
                <Input
                  id="id"
                  name="id"
                  value={plan.id}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="period">Period</Label>
                <Select value={plan.period} onValueChange={handlePeriodChange}>
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                name="name"
                value={plan.item.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={plan.item.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  name="currency"
                  value={plan.item.currency}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={plan.item.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="tax_inclusive"
                name="tax_inclusive"
                checked={plan.item.tax_inclusive}
                onCheckedChange={(checked) =>
                  setPlan((prevPlan) => ({
                    ...prevPlan,
                    item: { ...prevPlan.item, tax_inclusive: checked === true },
                  }))
                }
              />
              <Label htmlFor="tax_inclusive">Tax Inclusive</Label>
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                name="notes"
                value={plan.notes}
                onChange={handleChange}
              />
            </div>
            <Button type="submit" className="w-full">
              Create Plan
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}