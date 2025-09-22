import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

const Logo = () => {
  return (
  
    <Button size='sm'>

      <Link href="/" className='text-xl'>
      Logos
      </Link>

    </Button>
  )
}

export default Logo
