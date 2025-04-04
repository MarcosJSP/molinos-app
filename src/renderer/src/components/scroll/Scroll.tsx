import { cn } from '@/utils/helpers'
import { ComponentProps, FC, useLayoutEffect, useRef, useState } from 'react'

const Scroll: FC<ComponentProps<'div'>> = ({ className, ...props }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(true)
  const [bottom, setBottom] = useState(true)

  console.log('top: ', top, 'bottom: ', bottom)

  useLayoutEffect(() => {
    const scrollbar = ref.current
    if (scrollbar == null) {
      return
    }
    const scrollHandler = (): void => {
      // scroll at beginning?
      setTop(scrollbar.scrollTop < 10)

      // scroll at end?
      const maxScrollY = scrollbar.scrollHeight - scrollbar.clientHeight
      setBottom(maxScrollY - scrollbar.scrollTop < 10)
    }
    scrollHandler()
    scrollbar.addEventListener('scroll', scrollHandler)
    return (): void => scrollbar.removeEventListener('scroll', scrollHandler)
  }, [top])

  return (
    <>
      <div className="relative z-20 h-0">
        <div
          className={cn(
            'from-app-primary-200/10 pointer-events-none relative top-0 left-0 block h-[40px] w-full bg-radial to-transparent to-80% bg-[size:100%_120px] bg-[position:0_-80px] bg-no-repeat',
            top ? 'opacity-0 duration-100' : 'opacity-100 duration-200'
          )}
        />
      </div>
      <div
        ref={ref}
        className={cn(
          'scrollbar scrollbar-thumb-app-gray-800 scrollbar-track-transparent relative z-10 overflow-auto',
          className
        )}
        {...props}
      />
      <div className="relative z-20 h-0">
        {!bottom && (
          <div
            className={cn(
              'animate-in fade-in from-app-primary-200/20 pointer-events-none relative -top-[40px] block h-[40px] w-full rotate-180 bg-radial to-transparent to-80% bg-[size:100%_120px] bg-[position:0_-80px] bg-no-repeat',
              bottom ? 'opacity-0 duration-100' : 'opacity-100 duration-200'
            )}
          />
        )}
      </div>
    </>
  )
}

export default Scroll
