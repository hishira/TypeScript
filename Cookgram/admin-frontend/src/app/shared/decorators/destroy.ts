import { Subscription } from 'rxjs';

//TODO: Check this method in angular
// export function Destroy<T extends { new (...args: any[]): {} }>(
//   constructor: T
// ) {
//   return class extends constructor {
//     subscription: Subscription = new Subscription();

//     ngOnDestroy(): void {
//       console.log('HI');
//     }
//   };
// }

type DestroyerType<T extends { new (...args: any[]): {} }> = T & {
  subscription: Subscription;
};

export function Destroyer<T extends { new (...args: any[]): {} }>(): (
  constryctor: T
) => DestroyerType<T> {
  return function (constructor: T): DestroyerType<T> {
    (constructor as any).subscription = new Subscription();
    const orig = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      for (let prop of Object.keys(this)) {
        if (typeof this[prop]?.unsubscribe === 'function') {
          this[prop].unsubscribe();
        }
      }
      orig?.apply();
    };
    return constructor as DestroyerType<T>;
  };
}
