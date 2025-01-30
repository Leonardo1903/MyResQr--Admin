import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and manage pending account requests.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>PIN Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Handle PIN-related requests and resets.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create new subscription plans.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generate PINs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Generate new PINs for plans.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

