import { useState, useEffect } from "react";
import axios from "axios";
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

export default function PendingRequests() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const accessToken = sessionStorage.getItem("accessToken");
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseUrl}/dealer/pending-requests/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setPendingRequests(response.data))
      .catch((error) =>
        console.error("Error fetching pending requests:", error)
      );
  }, []);

  const handleAction = (id, action) => {
    axios
      .post(
        `${baseUrl}/dealer/request-approval/`,
        {
          request_id: id,
          action: action === "accept" ? "approve" : "deny",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setPendingRequests(
          pendingRequests.filter((request) => request.id !== id)
        );
        console.log(`Pending Request ${id} ${action}ed`);
        setSelectedRequest(null);
      })
      .catch((error) => console.error("Error handling action:", error));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Pending Requests</h1>
      <div className="space-y-6">
        {pendingRequests.map((request) => (
          <Card key={request.id} onClick={() => setSelectedRequest(request)}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{request.dealership_name}</span>
                <Badge>{request.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submitted at: {new Date(request.submitted_at).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRequest && (
        <Dialog open={true} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogTitle>{selectedRequest.dealership_name}</DialogTitle>
            <DialogDescription>
              <p>
                <strong>Dealer Address:</strong>{" "}
                {selectedRequest.dealer_address}
              </p>
              <p>
                <strong>Billing Address:</strong>{" "}
                {selectedRequest.billing_address}
              </p>
              <p>
                <strong>GSTIN:</strong> {selectedRequest.gstin}
              </p>
              <p>
                <strong>CIN:</strong> {selectedRequest.cin}
              </p>
              <p>
                <strong>Owner Name:</strong> {selectedRequest.owner_name}
              </p>
              <p>
                <strong>Owner Mobile:</strong> {selectedRequest.owner_mobile}
              </p>
              <p>
                <strong>Owner Email:</strong> {selectedRequest.owner_email}
              </p>
              <p>
                <strong>Dealer SPOC Name:</strong>{" "}
                {selectedRequest.dealer_spoc_name}
              </p>
              <p>
                <strong>Dealer SPOC Number:</strong>{" "}
                {selectedRequest.dealer_spoc_number}
              </p>
              <p>
                <strong>Number of Showrooms:</strong>{" "}
                {selectedRequest.number_of_showrooms}
              </p>
              <p>
                <strong>Shipping:</strong> {selectedRequest.shipping}
              </p>
              <h3 className="text-xl font-bold mt-4">Directors</h3>
              {selectedRequest.directors.map((director, index) => (
                <div key={index}>
                  <p>
                    <strong>Name:</strong> {director.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {director.email}
                  </p>
                  <p>
                    <strong>Number:</strong> {director.number}
                  </p>
                </div>
              ))}
              <h3 className="text-xl font-bold mt-4">Showrooms</h3>
              {selectedRequest.showrooms.map((showroom, index) => (
                <div key={index}>
                  <p>
                    <strong>Address:</strong> {showroom.address}
                  </p>
                  <p>
                    <strong>Manager Name:</strong> {showroom.manager_name}
                  </p>
                  <p>
                    <strong>Manager Number:</strong> {showroom.manager_number}
                  </p>
                </div>
              ))}
              <h3 className="text-xl font-bold mt-4">Bank Details</h3>
              <p>
                <strong>Bank Name:</strong>{" "}
                {selectedRequest.bank_details.bank_name}
              </p>
              <p>
                <strong>IFSC Code:</strong>{" "}
                {selectedRequest.bank_details.ifsc_code}
              </p>
              <p>
                <strong>Branch Name:</strong>{" "}
                {selectedRequest.bank_details.branch_name}
              </p>
              <p>
                <strong>Account Name:</strong>{" "}
                {selectedRequest.bank_details.account_name}
              </p>
              <p>
                <strong>Account Number:</strong>{" "}
                {selectedRequest.bank_details.account_number}
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  onClick={() => handleAction(selectedRequest.id, "accept")}
                  className="bg-red-100 text-red-600 hover:bg-red-200"
                >
                  Deny
                </Button>
                <Button
                  onClick={() => handleAction(selectedRequest.id, "deny")}
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