import React from 'react'
import { Link } from 'react-router-dom'

const SavItems =({display}) => {
  return (
    <div className="flex items-center gap-4 group">
        <Link className={`text-sm`}>{display}</Link>
    </div>
  )
}

export default SavItems