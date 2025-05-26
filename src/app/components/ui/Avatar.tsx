import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import Image, { type ImageProps } from 'next/image'

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: React.ReactNode
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
          className
        )}
        {...props}
      >
        {src ? (
          <Image
            src={src}
            alt={alt || ''}
            className="aspect-square h-full w-full"
            fill
            sizes="40px"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          fallback || (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              {children}
            </div>
          )
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

type AvatarImageProps = Omit<ImageProps, 'src'> & {
  src: string | null | undefined
}

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = 'Avatar', ...props }, ref) => (
    <Image
      ref={ref}
      src={src || '/default-avatar.png'}
      className={cn('aspect-square h-full w-full', className)}
      alt={alt}
      sizes="40px"
      fill
      {...props}
    />
  )
)

AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-muted',
      className
    )}
    {...props}
  />
))

AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }