"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface Employee {
  id: string
  name: string
  address: string
  phone: string
  email: string
  department: string
}

interface TimeEntry {
  id: string
  date: string
  clockIn: string
  clockOut: string
}

function calculateHours(clockIn: string, clockOut: string): number {
  const [inHours, inMinutes] = clockIn.split(":").map(Number)
  const [outHours, outMinutes] = clockOut.split(":").map(Number)
  const totalMinutes = outHours * 60 + outMinutes - (inHours * 60 + inMinutes)
  return Math.round((totalMinutes / 60) * 100) / 100 // Round to 2 decimal places
}

function formatHours(hours: number): string {
  const wholeHours = Math.floor(hours)
  const minutes = Math.round((hours - wholeHours) * 60)
  return `${wholeHours}h ${minutes}m`
}

export default function TimesheetDisplay() {
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulating API call with mock data
    setTimeout(() => {
      setEmployee({
        id: "EMP001",
        name: "John Doe",
        address: "123 Main St, Anytown, USA",
        phone: "(555) 123-4567",
        email: "john.doe@example.com",
        department: "Engineering",
      })
      setTimeEntries([
        { id: "1", date: "2023-05-01", clockIn: "09:00", clockOut: "17:00" },
        { id: "2", date: "2023-05-02", clockIn: "08:30", clockOut: "16:30" },
        { id: "3", date: "2023-05-03", clockIn: "09:15", clockOut: "17:30" },
        { id: "4", date: "2023-05-04", clockIn: "08:45", clockOut: "16:45" },
        { id: "5", date: "2023-05-05", clockIn: "09:00", clockOut: "17:15" },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  if (isLoading) return <div className="text-center p-2">Loading...</div>
  if (error) return <div className="text-center text-red-500 p-2">{error}</div>
  if (!employee) return <div className="text-center p-2">No employee data found.</div>

  const totalHours = timeEntries.reduce((sum, entry) => sum + calculateHours(entry.clockIn, entry.clockOut), 0)

  return (
    <div className="container mx-auto p-2 space-y-4 max-w-2xl">
      <h1 className="text-xl font-bold mb-2">Employee Timesheet</h1>

      <Card className="overflow-hidden">
        <CardHeader className="p-2">
          <CardTitle className="text-lg">Employee Information</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div>
              <strong>Name:</strong> {employee.name}
            </div>
            <div>
              <strong>ID:</strong> {employee.id}
            </div>
            <div>
              <strong>Address:</strong> {employee.address}
            </div>
            <div>
              <strong>Phone:</strong> {employee.phone}
            </div>
            <div>
              <strong>Email:</strong> {employee.email}
            </div>
            <div>
              <strong>Department:</strong> {employee.department}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader className="p-2">
          <CardTitle className="text-lg">Time Entries</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <div className="space-y-4">
            {timeEntries.map((entry) => {
              const dailyHours = calculateHours(entry.clockIn, entry.clockOut)
              return (
                <div key={entry.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="text-lg font-semibold mb-2">
                    {new Date(entry.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <Separator className="my-2" />
                  <div className="text-sm mt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Clock In:</span>
                      <span>{entry.clockIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Clock Out:</span>
                      <span>{entry.clockOut}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total Hours:</span>
                      <span>{formatHours(dailyHours)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-primary text-primary-foreground">
        <CardContent className="p-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Hours for Week:</span>
            <span className="text-xl font-bold">{formatHours(totalHours)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

