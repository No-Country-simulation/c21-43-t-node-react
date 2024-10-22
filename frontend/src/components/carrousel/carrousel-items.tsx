import { cn } from '../../lib/utils'

export default function carrouselItems() {
  return (
    <li className={cn("absolute inset-0 overflow-hidden after:absolute after:w-full after:h-full after:left-0 after:bottom-0")}>
      <div className='bg'></div>
    </li>

  )

}