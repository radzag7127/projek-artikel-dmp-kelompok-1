"use client";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const monthlyData = [
  { month: "J", value: 2300 },
  { month: "F", value: 2100 },
  { month: "M", value: 2400 },
  { month: "A", value: 1800 },
  { month: "M", value: 2600 },
  { month: "J", value: 2200 },
  { month: "J", value: 2700 },
  { month: "A", value: 2100 },
];

const topTasks = [
  { name: "Backend API Integration", value: 15, completed: 10 },
  { name: "Frontend Development", value: 12, completed: 8 },
  { name: "Database Migration", value: 9, completed: 7 },
  { name: "UI/UX Design", value: 8, completed: 6 },
  { name: "Testing & QA", value: 6, completed: 3 },
];

const teamMembers = [
  { name: "Michael Christopher Harijanto", tasks: 14 },
  { name: "Radyza Glagah Sudharma", tasks: 12 },
  { name: "Muhammad Zidan", tasks: 11 },
  { name: "Fikri Noor Arafah", tasks: 10 },
  { name: "Muhammad Reihan Ghiffari", tasks: 9 },
  { name: "Hilal Dhiyaulhaq", tasks: 8 },
];

const forecastData = [
  { month: "May", actual: 372941, forecast: 380000 },
  { month: "Jun", actual: 380418, forecast: 385000 },
  { month: "Jul", actual: 387533, forecast: 390000 },
  { month: "Aug", forecast: 395000 },
  { month: "Sep", forecast: 400000 },
];

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Project Performance Analytics</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span className="text-sm">Team 5</span>
          <span className="text-sm text-muted-foreground">
            Project Analytics
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-medium mb-4">Key Figures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "TASKS COMPLETED",
                value: "45",
                target: "/ 60",
                change: "-48.83%",
                data: monthlyData,
              },
              {
                title: "HOURS LOGGED",
                value: "1,271",
                target: "/ 3,099",
                change: "-58.99%",
                data: monthlyData,
              },
              {
                title: "TEAM MEMBERS ACTIVE",
                value: "268",
                target: "/ 685",
                change: "-60.88%",
                data: monthlyData,
              },
              {
                title: "COMMITS",
                value: "847",
                target: "/ 2,070",
                change: "-59.08%",
                data: monthlyData,
              },
            ].map((item, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {item.value}
                    <span className="text-base font-normal text-muted-foreground ml-1">
                      {item.target}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-sm font-medium text-red-500">
                      {item.change}
                    </span>
                  </div>
                  <div className="h-[40px]">
                    <ResponsiveContainer width="100%" height={40}>
                      <BarChart data={item.data}>
                        <Bar
                          dataKey="value"
                          fill="currentColor"
                          className="fill-primary/20"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-4">Project Statistics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Top Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={topTasks}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={150} />
                    <Tooltip />
                    <Bar dataKey="value" name="Total Hours" fill="#333" />
                    <Bar
                      dataKey="completed"
                      name="Completed Hours"
                      fill="#666"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Team Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className="w-[180px] text-sm truncate"
                        title={member.name}
                      >
                        {member.name}
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${(member.tasks / 15) * 100}%` }}
                        />
                      </div>
                      <div className="w-[30px] text-sm text-right ml-2">
                        {member.tasks}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Project Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={forecastData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorActual"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#333" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#333" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient
                        id="colorForecast"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="5%" stopColor="#666" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#666" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="actual"
                      stroke="#333"
                      fillOpacity={1}
                      fill="url(#colorActual)"
                    />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      stroke="#666"
                      fillOpacity={1}
                      fill="url(#colorForecast)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
