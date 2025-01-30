import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"


function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-black/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-black text-center block">Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/20 text-black border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-black text-center block">Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/20 text-black border-gray-300"
            />
          </div>
          <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white">
            Login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default LoginForm