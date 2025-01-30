import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

const mockPinRequests = [
  { id: 1, name: "Alice Cooper", type: "PIN Reset", date: "2023-05-01" },
  { id: 2, name: "David Bowie", type: "New PIN", date: "2023-05-02" },
  { id: 3, name: "Elton John", type: "PIN Reset", date: "2023-05-03" },
]

export default function PinRequests() {
  const [pinRequests, setPinRequests] = useState(mockPinRequests)

  const handleAction = (id, action) => {
    setPinRequests(pinRequests.filter((request) => request.id !== id))
    console.log(`PIN Request ${id} ${action}ed`)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">PIN Requests</h1>
      <div className="space-y-6">
        {pinRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{request.name}</span>
                <Badge>{request.type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date: {request.date}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleAction(request.id, "deny")}
                  className="bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Deny
                </Button>
                <Button
                  onClick={() => handleAction(request.id, "accept")}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Accept
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

