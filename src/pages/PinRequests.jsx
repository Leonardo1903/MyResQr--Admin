import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import axios from "axios";

export default function PinRequests() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const [pinRequests, setPinRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const accessToken = sessionStorage.getItem("accessToken");

  useEffect(() => {
    axios
      .get(`${baseUrl}/dealer/pending-pin-requests/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setPinRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching PIN requests:", error);
      });
  }, [baseUrl]);

  const handleAction = (id, action) => {
    axios
      .post(
        `${baseUrl}/dealer/pin-approval/`,
        { request_id: id, action },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        setPinRequests(pinRequests.filter((request) => request.id !== id));
        console.log(`PIN Request ${id} ${action}ed`);
        setSelectedRequest(null);
      })
      .catch((error) => {
        console.error(`Error ${action}ing PIN request:`, error);
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">PIN Requests</h1>
      <div className="space-y-6">
        {pinRequests.length === 0 ? (
          <p>No pending PIN requests</p>
        ) : (
          pinRequests.map((request) => (
            <Card key={request.id} onClick={() => setSelectedRequest(request)}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{request.pin_number}</span>
                  <Badge>{request.status}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Created at: {new Date(request.created_at).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {selectedRequest && (
        <Dialog open={true} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogTitle>PIN Request Details</DialogTitle>
            <DialogDescription>
              <p><strong>PIN Number:</strong> {selectedRequest.pin_number}</p>
              <p><strong>Activation Key:</strong> {selectedRequest.activation_key}</p>
              <p><strong>Activated By:</strong> {selectedRequest.activated_by}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>
              <p><strong>Created At:</strong> {new Date(selectedRequest.created_at).toLocaleString()}</p>
              <p><strong>Profile:</strong> {selectedRequest.profile}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handleAction(selectedRequest.id, "reject")}
                  className="bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Deny
                </Button>
                <Button
                  onClick={() => handleAction(selectedRequest.id, "accept")}
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  Accept
                </Button>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}