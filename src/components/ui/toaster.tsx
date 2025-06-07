"use client"

<<<<<<< HEAD
=======
import { useToast } from "@/hooks/use-toast"
>>>>>>> 7cbc18989a191aa23153d0457fa0aaad00885e8b
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
<<<<<<< HEAD
import { useToast } from "@/components/ui/use-toast"
=======
>>>>>>> 7cbc18989a191aa23153d0457fa0aaad00885e8b

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
