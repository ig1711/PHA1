## 2. What is the use of the keyof keyword in TypeScript? Provide an example.
`keyof` keyword একটি type operator. এটি object type এর উপর কাজ করে এবং output হিসেবে আরেকটি type তৈরি করে যা হল object type টির key গুলো দ্বারা তৈরি `string` অথবা `number` literal type এর union type

```ts
type Person = {
    id: number;
    name: string;
};

type Keys = keyof Person;
```
উপরের `Keys` type টি এবং `type Keys = "id" | "name"` এর মধ্যে কোন পার্থক্য নেই

### `keyof` operator টি আমাদের বিভিন্ন কাজে লাগে যেমন
1. কোন variable বা function parameter কে কোন object এর key হিসেবে constrained করতে keyof operator ব্যাবহার করা যায়. `keyof` operator ছাড়া এটি করতে হলে আমাদের সবগুলো key এর নাম manually লিখে দিতে হতো. এক্ষেত্রে যদি object type টির অসংখ্য key থাকে, আমাদের ভীষণ প্যারায় পড়তে হতো। 
```ts
type User = {
    id: number;
    name: string;
};

function accessField(user: User, key: keyof User) {
    return user[key];
}

accessField({ id: 0, name: 'John' }, 'id'); // works
accessField({ id: 0, name: 'John' }, 'name'); // works
accessField({ id: 0, name: 'John' }, 'anythingElse'); // error
```
2. Index signature ব্যাবহার করে একটি type এর মত করে আরেকটি type (Mapped type) তৈরি করতে keyof operator ব্যাবহার করা যায়।
```ts
type User = {
    id: number;
    name: string;
}

type InputUser = {
    [Key in keyof User]: string | number;
}
// ^ - same as:
// type InputUser = {
//     id: string | number;
//     name: string | number;
// }

``` 


## 5. Provide an example of using union and intersection types in TypeScript.
Union এবং intersection type তৈরি করার আগে আমরা কিছু normal type তৈরি করে ফেলি
```ts
interface Plane {
    model: string;
    speed: number;
    cost: number;
    runwayDistance: number;
    isInternational: boolean;
}

interface RoadTransport {
    model: string;
    speed: number;
    cost: number;
    wheels: number;
}

interface Ship {
    model: string;
    speed: number;
    cost: number;
    levels: number;
    isInternational: boolean;
}

interface PublicTransport {
    maxNumberOfPeople: number;
    comfortRating: number;
    from: string;
    to: string;
}

interface Cargo {
    loadCapacity: number;
    loadUnloadDelay: number;
}
```
### Union type এর example:
ধরুন আমরা `Plane`, `RoadTransport` বা `Ship` যেকোন একটি `Vehicle` এর কিছু details print করার একটি function তৈরি করতে চাই, আমরা সেটি এভাবে করতে পারি
```ts
function printDetails(vehicle: Plane | RoadTransport | Ship) {
    console.log(`Model: ${vehicle.model}, Speed: ${vehicle.speed}, Cost: ${vehicle.cost}`);
}
```
এখানে, `Plane | RoadTransport | Ship` হল একটি union type. আরও ভালোভাবে বুঝতে আমরা একটি type declare করে function টি refactor করি
```ts
// `Vehicle` একটি union type
type Vehicle = Plane | RoadTransport | Ship;

function printDetails(vehicle: Vehicle) {
    console.log(`Model: ${vehicle.model}, Speed: ${vehicle.speed}, Cost: ${vehicle.cost}`);
}
```
`printDetails` function টি ব্যাবহার করার সময় আমরা parameter হিসেবে `Plane`, `RoadTransport` ba `Ship` এর মধ্যে যেকোন একটি type এর value ব্যাবহার করতে পারি
```ts
const jashimsPlane: Plane = {
    model: 'JP1997 A380747',
    speed: 1200,
    cost: 35.5,
    runwayDistance: 1.2,
    isInternational: true,
}

const mannasTruck: RoadTransport = {
    model: 'BDTR 2014 XL-10',
    speed: 60,
    cost: 2.5,
    wheels: 10,
}

const shakibsShip: Ship = {
    model: 'MV Bubli L20Q4',
    speed: 50,
    cost: 12,
    levels: 2,
    isInternational: false,
}

printDetails(jashimsPlane);
printDetails(mannasTruck);
printDetails(shakibsShip);
```
### Intersection type এর example:
ধরুন আমাদের একটি function লাগবে যেটা কোন cargo truck এর প্রতি চাকা তে maximum কত kg load পড়বে সেটা output দিবে।  function টিতে দরকার পরবে চাকার সংখ্যা যা `RoadTransport` type এ আছে (wheels) এবং load capacity, যা `Cargo` type এ আছে। তাহলে এই function টির parameter হিসেবে আমরা শুধু সেই সকল object ই নিতে পারবো যেগুলোতে `RoadTransport` এবং `Cargo` উভয় type এরই property গুলো রয়েছে। এই constraint টি typescript এ ব্যখ্যা করার জন্য আমরা যে type টি ব্যবহার করি সেটা হল intersection type
```ts
type CargoRoadVehicle = RoadTransport & Cargo;
// এখানে ^ CargoRoadVehicle type টি একটি intersection type 

function getMaxLoadPerWheel(vehicle: CargoRoadVehicle): number {
    return vehicle.loadCapacity / vehicle.wheels;
}

const mannasCargoTruck: CargoRoadVehicle = {
    model: 'BDTR 2014 XL-10',
    speed: 60,
    cost: 2.5,
    wheels: 10,
    loadCapacity: 4000,
    loadUnloadDelay: 0.1,
}

console.log(getMaxLoadPerWheel(mannasCargoTruck));
```