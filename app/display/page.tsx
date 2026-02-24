'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function DisplayPage() {
  const [serving, setServing] = useState<any>(null)
  const [waiting, setWaiting] = useState<any[]>([])

  const fetchQueue = async () => {
    // Get currently serving ticket
    const { data: servingData } = await supabase
      .from('tickets')
      .select(`
        id,
        ticket_number,
        queue_logs (
          counters (
            counter_name
          )
        )
      `)
      .eq('status', 'serving')
      .order('served_at', { ascending: false })
      .limit(1)
      .single()

    // Get next 3 waiting tickets
    const { data: waitingData } = await supabase
      .from('tickets')
      .select('ticket_number')
      .eq('status', 'waiting')
      .order('ticket_number', { ascending: true })
      .limit(3)

    setServing(servingData)
    setWaiting(waitingData || [])
  }

  useEffect(() => {
    fetchQueue()

    // Subscribe to real-time changes
    const channel = supabase
      .channel('queue-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tickets' },
        () => {
          fetchQueue()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-12 p-8">

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Now Serving</h1>

        {serving ? (
          <>
            <div className="text-7xl font-bold text-green-400">
              {serving.ticket_number}
            </div>

            <div className="text-2xl mt-2">
              Counter {serving.queue_logs?.[0]?.counters?.counter_name}
            </div>
          </>
        ) : (
          <div className="text-2xl">No ticket being served</div>
        )}
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Next In Line</h2>

        <div className="flex gap-10 text-4xl">
          {waiting.length > 0 ? (
            waiting.map((ticket, index) => (
              <div key={index} className="bg-gray-800 px-6 py-4 rounded">
                {ticket.ticket_number}
              </div>
            ))
          ) : (
            <div>No waiting tickets</div>
          )}
        </div>
      </div>

    </main>
  )
}
