type FormatValueType = string | number | boolean;

function formatValue(value: FormatValueType): FormatValueType {
    if (typeof value === 'string') return value.toUpperCase();
    else if (typeof value === 'number') return value * 10;
    else return !value;
}


function getLength(value: string | Array<any>): number {
    if (typeof value === 'string') return value.length;
    else if (Array.isArray(value)) return value.length;
    else throw Error('unreachable');
}


class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}


interface Item {
    title: string;
    rating: number;
}

function filterByRating(items: Array<Item>): Array<Item> {
    return items.filter(item => item.rating >= 4);
}


interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

function filterActiveUsers(users: Array<User>): Array<User> {
    return users.filter(user => user.isActive);
}


interface Book {
    title: string;
    author: string;
    publishedYear: number;
    isAvailable: boolean;
}

function printBookDetails(book: Book) {
    console.log(`Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${book.isAvailable}`);
}


function getUniqueValues<T extends string | number, U extends Array<T>, V extends U>(array1: U, array2: V): V {
    const temp = new Array<T>();

    function getItemAtIndex(index: number): T {
        if (index < array1.length) return array1[index];
        else return array2[index - array1.length];
    }

    outer: for (let i = 0; i < (array1.length + array2.length); i++) {
        for (let j = 0; j < i; j++) {
            if (getItemAtIndex(i) === getItemAtIndex(j)) continue outer;
        }

        temp[temp.length] = getItemAtIndex(i);
    }

    return temp as V;
}


interface Product {
    name: string;
    price: number;
    quantity: number;
    discount?: number;
}

function calculateTotalPrice(products: Array<Product>): number {
    return (products.reduce((total, product) => {
        const subTotal = product.price * product.quantity;
        const afterDiscount = subTotal - (subTotal * (product.discount ?? 0) / 100);
        return total + afterDiscount;
    }, 0));
}
