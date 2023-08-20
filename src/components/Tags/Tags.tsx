import React from 'react'
import { useState } from 'react'

interface ChangeProps {
  handleChange: (data: { key: string; value: any }) => void
}

function Tags({ handleChange }: ChangeProps) {
  const [tagValue, setTagValue] = useState<string>('')

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
