import type { ImgHTMLAttributes } from 'preact/compat';
import { useImage } from '../hooks';
import { cn } from '../utils';
import { AlertTriangle } from 'lucide-react';

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  src?: string;
  skeletonClassName?: string;
  errorClassName?: string;
}

export function Image({
  src,
  alt,
  className,
  skeletonClassName = 'skeleton',
  errorClassName = 'error',
  ...imgProps
}: ImageProps) {
  const { data: url, isPending, error } = useImage(src);

  if (isPending) return <div className={cn(skeletonClassName, className)} />;
  if (error)
    return (
      <div className={cn(errorClassName, className)}>
        <AlertTriangle />
      </div>
    );

  return <img src={url} alt={alt} className={className} {...imgProps} />;
}
