import { cn } from '@/lib/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

const Select = SelectPrimitive.Root;

const SelectTrigger = ({
  className,
  children,
  ...props
}: SelectPrimitive.SelectTriggerProps) => {
  return (
    <SelectPrimitive.Trigger
      className={cn(
        'border-input border-border ring-offset-background placeholder:text-muted-foreground flex h-10 min-w-40 items-center justify-between border-2 bg-transparent px-4 py-2 shadow-md focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
        className?.toString()
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="ml-2 h-4 w-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

const SelectValue = SelectPrimitive.Value;

const SelectIcon = SelectPrimitive.Icon;

const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: SelectPrimitive.SelectContentProps) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          'border-border bg-background text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 min-w-[8rem] overflow-hidden border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className?.toString()
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
};

const SelectGroup = SelectPrimitive.Group;

const SelectItem = ({
  className,
  children,
  ...props
}: SelectPrimitive.SelectItemProps) => (
  <SelectPrimitive.Item
    className={cn(
      'hover:bg-primary hover:text-primary-foreground relative flex w-full cursor-default items-center px-2 py-1.5 outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50',
      className?.toString()
    )}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>

    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="text-foreground h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>
);
const SelectLabel = SelectPrimitive.Label;
const SelectSeparator = SelectPrimitive.Separator;

const SelectObj = Object.assign(Select, {
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Content: SelectContent,
  Group: SelectGroup,
  Item: SelectItem,
  Label: SelectLabel,
  Separator: SelectSeparator,
});

export { SelectObj as Select };
