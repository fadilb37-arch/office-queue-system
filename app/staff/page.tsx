'use client'

import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StaffPage() {
  const [counterId, setCounterId] = useState<string | null>(null)
  const [counterName, setCounterName] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      const { data } = await supabase
        .from('staff_profiles')
        .select(`
          counter_id,
          full_name
        `)
        .eq('id', user.id)
        .single()

      if (!data) {
        alert('No counter assigned')
        return
      }

      setCounterId(data.counter_id)
      setCounterName(data.full_name)
    }

    checkUser()
  }, [])

  const callNext = async () => {
    if (!counterId) return

    // Mark current serving as completed
    const { data: currentServing } = await supabase
      .from('queue_logs')
      .select(`
        ticket_id,
        tickets (*)
      `)
      .eq('counter_id', counterId)
      .order('called_at', { ascending: false })
      .limit(1)
      .single()

    if (currentServing?.tickets?.status === 'serving') {
      await supabase
        .from('tickets')
        .update({ status: 'completed' })
        .eq('id', currentServing.ticket_id)
    }

    // Get next waiting
    const { data: ticket } = await supabase
      .from('tickets')
      .select('*')
      .eq('status', 'waiting')
      .order('ticket_number', { ascending: true })
      .limit(1)
      .single()

    if (!ticket) {
      alert('No waiting tickets')
      return
    }

    await supabase
      .from('tickets')
      .update({ status: 'serving', served_at: new Date() })
      .eq('id', ticket.id)

    await supabase
      .from('queue_logs')
      .insert({
        ticket_id: ticket.id,
        counter_id: counterId
      })

    alert(`Now serving ticket ${ticket.ticket_number}`)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">
        Staff Dashboard – {counterName}
      </h1>

      <button
        onClick={callNext}
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Call Next Ticket
      </button>
    </main>
  )
}
