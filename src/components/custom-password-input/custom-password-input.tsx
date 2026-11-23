import { Input } from '@krgaa/react-developer-burger-ui-components';
import { useState, type ComponentProps } from 'react';

type TCustomPasswordInputProps = Omit<
  ComponentProps<typeof Input>,
  'type' | 'icon' | 'onIconClick'
>;

export const CustomPasswordInput = (
  props: TCustomPasswordInputProps
): React.JSX.Element => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Input
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      icon={isPasswordVisible ? 'HideIcon' : 'ShowIcon'}
      onIconClick={() => setIsPasswordVisible((prev) => !prev)}
    />
  );
};
