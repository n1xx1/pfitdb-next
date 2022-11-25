import {
  ComponentProps,
  ElementType,
  ValidationMap,
  WeakValidationMap,
  forwardRef as forwardReactRef,
} from "react";

export type As<Props = any> = ElementType<Props>;

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As;
};

export type OmitCommonProps<
  Target,
  OmitAdditionalProps extends keyof any = never
> = Omit<Target, "as" | OmitAdditionalProps>;

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {}
> = OmitCommonProps<SourceProps, keyof OverrideProps> & OverrideProps;

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As
> = RightJoinProps<ComponentProps, AdditionalProps> &
  RightJoinProps<AsProps, AdditionalProps> & { as?: AsComponent };

export type ComponentWithAs<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      ComponentProps<Component>,
      ComponentProps<AsComponent>,
      Props,
      AsComponent
    >
  ): JSX.Element;

  displayName?: string;
  propTypes?: WeakValidationMap<any>;
  contextTypes?: ValidationMap<any>;
  defaultProps?: Partial<any>;
  id?: string;
};

export function forwardRef<Props extends object, Component extends As>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as?: As;
    }
  >
) {
  return forwardReactRef(component) as unknown as ComponentWithAs<
    Component,
    Props
  >;
}
