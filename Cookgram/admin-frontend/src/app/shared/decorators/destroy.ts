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
    const orig = constructor.prototype.ngOnDestroy;
    constructor.prototype.ngOnDestroy = function () {
      checkProprsWithUnsubscribeOption.bind(this)();
      orig?.apply();
    };
    return constructor as DestroyerType<T>;
  };
}

function checkProprsWithUnsubscribeOption(this: any): void {
  for (let prop of Object.keys(this)) {
    if (typeof this[prop]?.unsubscribe === 'function') {
      this[prop].unsubscribe();
    }
  }
}
