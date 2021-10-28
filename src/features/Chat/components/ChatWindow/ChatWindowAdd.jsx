import React from 'react'

export default function ChatWindowAdd({add}) {

  return (
    <div>
      {add ? 'Add Friend' : 'Add Group'}
    </div>
  )
}
