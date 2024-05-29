import React from 'react'
import { Link } from 'react-router-dom'


const FotItems = ({ icon, display,color }) => {
  return (
    <div className="flex items-center gap-2 group">
        {icon}
        <Link  className={`text-sm ${color}`}>{display}</Link>
    </div>
  )
}

export default FotItems