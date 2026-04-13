'use client'

import { useState } from 'react'
import RSVPModal from './RSVPModal'

interface Props {
  className?: string
  children?: React.ReactNode
}

export default function RSVPButton({ className, children = 'Request Access' }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)} className={className}>
        {children}
      </button>
      <RSVPModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
