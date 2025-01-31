import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useToast } from "../hooks/use-toast";
import axios from "axios";

export default function GeneratePins() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { toast } = useToast();
  const accessToken = sessionStorage.getItem("accessToken");
  const [pinData, setPinData] = useState({
    start: 10000000,
    count: 10,
    plan_id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${baseUrl}/pin_manager/generate_pin`,
        pinData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "PINs generated successfully",
        status: "success",
      });
      console.log("API response:", response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
      console.error("API error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPinData((prevData) => ({
      ...prevData,
      [name]: name === "count" ? Number.parseInt(value) : value,
    }));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Generate PINs</h1>
      <Card>
        <CardHeader>
          <CardTitle>PIN Generation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="start">Start Number</Label>
              <Input
                id="start"
                name="start"
                type="number"
                value={pinData.start}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="count">Count</Label>
              <Input
                id="count"
                name="count"
                type="number"
                value={pinData.count}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="plan_id">Plan ID</Label>
              <Input
                id="plan_id"
                name="plan_id"
                value={pinData.plan_id}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Generate PINs
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
