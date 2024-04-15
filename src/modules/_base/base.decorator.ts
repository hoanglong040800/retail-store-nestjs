export function TryCatch(): MethodDecorator {
  return (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    
    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } catch (err) {
        throw new Error(err);
      }
    };
  };
}
