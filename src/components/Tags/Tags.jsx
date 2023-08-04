import React from 'react'
import { useContext } from 'react'
import { TodoContext } from '../../contexts/taskContext'

function Tags() {
  const { setTagValue, tagValue } = useContext(TodoContext)
  return (
    <div className="pt-4">
      <p className="text-xl mb-4">Add Tags</p>
      <input
        onChange={e => setTagValue(e.target.value)}
        value={tagValue}
        className="w-full p-2 rounded-xl"
        type="text"
        placeholder="Tag1, Tag2, Tag3, ..."
      />
    </div>
  )
}

export default Tags
