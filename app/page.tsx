'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

import Navbar from "./components/navbar"
import Hero from "./components/hero"
import NewsList from "./components/newslist"
import Fixtures from "./components/fixtures"

export default function Home() {
  const [ticketNumber, setTicketNumber] = useState<number | null>(null)

  const createTicket = async () => {
    const { data, error } = await supabase
      .from('tickets')
      .insert({})
      .select()
      .single()

    if (error) {
      alert('Error creating ticket')
      console.log(error)
      return
    }

    setTicketNumber(data.ticket_number)
  }

 const callNext = async () => {
  // 1️⃣ Get first waiting ticket
  const { data: ticket, error: fetchError } = await supabase
    .from('tickets')
    .select('*')
    .eq('status', 'waiting')
    .order('ticket_number', { ascending: true })
    .limit(1)
    .single()

  if (fetchError || !ticket) {
    alert('No waiting tickets')
    return
  }

  // 2️⃣ Update ticket status to serving
  const { error: updateError } = await supabase
    .from('tickets')
    .update({ status: 'serving', served_at: new Date() })
    .eq('id', ticket.id)

  if (updateError) {
    alert('Error updating ticket')
    return
  }

  // 3️⃣ Get active counter
  const { data: counter, error: counterError } = await supabase
    .from('counters')
    .select('*')
    .eq('active', true)
    .limit(1)
    .single()

  if (counterError || !counter) {
    alert('No active counter found')
    return
  }

  // 4️⃣ Insert into queue_logs
  const { error: logError } = await supabase
    .from('queue_logs')
    .insert({
      ticket_id: ticket.id,
      counter_id: counter.id
    })

  if (logError) {
    alert('Error logging queue')
    return
  }

  alert(`Now serving ticket ${ticket.ticket_number} at ${counter.counter_name}`)
}



  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Hero */}
        <div className="lg:col-span-2">
          <Hero />
        </div>

        {/* Sidebars */}
        <div className="space-y-8">
          <NewsList />
          <Fixtures />
        </div>

      </div>
    </div>
  )
}
