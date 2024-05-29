import React from 'react'
import { Link } from 'react-router-dom'


const IconItems = ({ icon, display,color }) => {
  return (
    <div className="flex items-center gap-4 group">
        {icon}
        <Link  className={`text-sm ${color}`}>{display}</Link>
    </div>
  )
}

export default IconItems