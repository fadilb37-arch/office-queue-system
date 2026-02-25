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



  return (<div className="bg-gradient-to-br from-purple-100 to-indigo-100 min-h-screen flex items-center justify-center p-10">
      <div className="flex flex-col lg:flex-row gap-10 max-w-6xl w-full">

        {/* Personal Plan */}
        <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col justify-between w-full">
          <div>
            <h3 className="text-indigo-600 font-semibold text-lg mb-6">
              Personal
            </h3>

            <div className="text-5xl font-bold text-gray-900">
              $29 <span className="text-lg font-normal text-gray-500">/month</span>
            </div>

            <p className="text-gray-500 mt-6 mb-8 leading-relaxed">
              The perfect plan if you're just getting started with our product.
            </p>

            <ul className="space-y-4 text-gray-700">
              {[
                "25 products",
                "Up to 10,000 subscribers",
                "Audience segmentation",
                "Advanced analytics",
                "Email support",
                "Marketing automations"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-indigo-600">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:opacity-90 transition">
            Get started today
          </button>
        </div>

        {/* Team Plan */}
        <div className="bg-white rounded-3xl shadow-xl p-10 flex flex-col justify-between w-full">
          <div>
            <h3 className="text-indigo-600 font-semibold text-lg mb-6">
              Team
            </h3>

            <div className="text-5xl font-bold text-gray-900">
              $99 <span className="text-lg font-normal text-gray-500">/month</span>
            </div>

            <p className="text-gray-500 mt-6 mb-8 leading-relaxed">
              A plan that scales with your rapidly growing business.
            </p>

            <ul className="space-y-4 text-gray-700">
              {[
                "Priority support",
                "Single sign-on",
                "Enterprise integrations",
                "Custom reporting tools"
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="text-indigo-600">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <button className="mt-10 border-2 border-indigo-200 text-indigo-600 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition">
            Get started today
          </button>
        </div>

      </div>
    </div>
  )
}
