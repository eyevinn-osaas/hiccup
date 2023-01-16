import { FC, useState } from 'react'
import styles from './button.module.css'
import { Icon, Props as IconProps } from './Icon'

interface ButtonProps extends Omit<IconProps, 'onClick' | 'onKeyUp'> {
  onSubmit: () => void
  disabled?: boolean
  buttonClassname?: string
}

export const IconButton: FC<ButtonProps> = ({
  onSubmit,
  disabled = false,
  size = 11,
  icon,
  buttonClassname,
  ...props
}) => {
  const [loading, setLoading] = useState(false)
  const handleClick = async (e: any) => {
    e.preventDefault()
    e.stopPropagation()
    if (loading) return

    setLoading(true)
    try {
      return await onSubmit()
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${disabled && 'disabled'} ${buttonClassname} ${
        styles.button
      }`}
      disabled={disabled}
    >
      <Icon size={size} icon={loading ? 'ellipsis' : icon} {...props} />
    </button>
  )
}
