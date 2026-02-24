'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    waiting: 0,
    serving: 0,
    completed: 0
  })

  const [counterData, setCounterData] = useState<any[]>([])

  const fetchStats = async () => {
    // Get ticket status counts
    const { data: tickets } = await supabase
      .from('tickets')
      .select('status')

    if (tickets) {
      const waiting = tickets.filter(t => t.status === 'waiting').length
      const serving = tickets.filter(t => t.status === 'serving').length
      const completed = tickets.filter(t => t.status === 'completed').length

      setStats({ waiting, serving, completed })
    }

    // Get counter performance
    const { data: logs } = await supabase
      .from('queue_logs')
      .select(`
        counter_id,
        counters ( counter_name )
      `)

    if (logs) {
      const performance: any = {}

      logs.forEach(log => {
        const name = log.counters?.[0]?.counter_name || 'Unknown'
        performance[name] = (performance[name] || 0) + 1
      })

      const formatted = Object.keys(performance).map(key => ({
        counter: key,
        tickets: performance[key]
      }))

      setCounterData(formatted)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Admin Analytics Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Waiting</h2>
          <p className="text-3xl mt-2">{stats.waiting}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Serving</h2>
          <p className="text-3xl mt-2">{stats.serving}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Completed</h2>
          <p className="text-3xl mt-2">{stats.completed}</p>
        </div>
      </div>

      {/* Counter Performance Chart */}
      <div className="bg-white p-6 rounded shadow h-96">
        <h2 className="text-xl font-semibold mb-4">
          Counter Performance
        </h2>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={counterData}>
            <XAxis dataKey="counter" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="tickets" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </main>
  )
}
