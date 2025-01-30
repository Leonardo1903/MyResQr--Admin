import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

export default function GeneratePins() {
  const [pinData, setPinData] = useState({
    start: 10000000,
    count: 10,
    plan_id: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted PIN generation data:", pinData)
    // Here you would typically make an API call to generate the PINs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPinData((prevData) => ({
      ...prevData,
      [name]: name === "count" ? Number.parseInt(value) : value,
    }))
  }

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
              <Input id="start" name="start" type="number" value={pinData.start} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="count">Count</Label>
              <Input id="count" name="count" type="number" value={pinData.count} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="plan_id">Plan ID</Label>
              <Input id="plan_id" name="plan_id" value={pinData.plan_id} onChange={handleChange} required />
            </div>
            <Button type="submit" className="w-full">
              Generate PINs
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

