import React from 'react'
import { useState } from 'react'

function Tags({ handleChange }) {
  const [tagValue, setTagValue] = useState('')

  const handleTagChange = e => {
    setTagValue(e.target.value)
    handleChange({ key: 'tags', value: e.target.value })
  }

  return (
    <div className="pt-4">
      <p className="text-xl mb-4">Add Tags</p>
      <input
        onChange={handleTagChange}
        value={tagValue}
        className="w-full p-2 rounded-xl"
        type="text"
        placeholder="Tag1, Tag2, Tag3, ..."
      />
    </div>
  )
}

export default Tags
