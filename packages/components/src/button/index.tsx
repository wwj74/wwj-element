import { createPrefixCls } from '@wwj/utils';
import type { ButtonProps as AntButtonProps } from 'antd';
import { Button as AntButton } from 'antd';
import cn from 'classnames';

const cls = createPrefixCls('button');

export interface ButtonProps extends Omit<AntButtonProps, 'size' | 'type'> {
  size?: '38' | '36' | '34' | '32' | '30' | '28' | '26' | '24' | '22' | '20';
  type?: AntButtonProps['type'] | 'second-primary' | 'third-primary' | 'warning';
  primary?: boolean;
  warning?: boolean;
}

export const Button = (props: ButtonProps) => {
  const { children, className, type, size, primary, warning, ...restProps } = props;
  const buttonType =
    type && ['second-primary', 'third-primary', 'warning'].includes(type) ? undefined : type;

  return (
    <AntButton
      {...restProps}
      type={buttonType as AntButtonProps['type']}
      className={cn(
        className,
        'my-test-class',
        cls.prefixCls,
        cls(
          {
            link: type === 'link',
            default: !type && !primary && !warning,
            'second-primary': type === 'second-primary',
            'third-primary': type === 'third-primary',
            'type-warning': type === 'warning',
            primary,
            warning,
          },
          size,
        ),
      )}
    >
      {children}
    </AntButton>
  );
};

Button.Group = AntButton.Group;

export default Button;
