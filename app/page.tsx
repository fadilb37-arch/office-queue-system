'use client'

import { supabase } from '@/lib/supabase'
import { useState } from 'react'

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
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Ticket Queue System</h1>

      <button
        onClick={createTicket}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Get Ticket
      </button>

      <button
        onClick={callNext}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Call Next
      </button>

      {ticketNumber && (
        <div className="text-xl font-semibold">
          Your Ticket Number: {ticketNumber}
        </div>
      )}
    </main>
  )
}
