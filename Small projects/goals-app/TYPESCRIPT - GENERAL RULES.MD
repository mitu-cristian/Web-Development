# TypeScript

------------

## General rules
1. A variable can hold multiple knew values `let userID: string | number;`
2. Custom object 
```javascript
    let user: {
    	name: string,
    	age: number,
    	isAdmin: boolean,
    	id: string | number
    }
```
3. Arrays `let hobbies: Array<string>` is the same thing as writting `let hobbies: string[]`
4. Literal types `let role: "admin" | "user" | "editor" | 18`
4.1. typeof - get the type of a variable 


    function performAction (action: string, role: Role) {
    	if(role === "admin" && typeof action === "string")
    }
4.2. "something" in variable
The below code will not work, the error received is: "User only refers to a type, but it is being used as a value".


    type User = {
        name: string;
        age: number;
    };
    
    type Admin = {
        name: string;
        age: number;
        permissions: string[];
    };
    
    function login(u: User | Admin) {
        if(typeof u === User) {
            
        }
    }
The solution is to replace the body of the login function with `if('permissions' in u) {}`
5. Set the type of the parameters and the return value for a function `function add(a: number, b: number): void {}`
6. Create custom types
6.1. Type 
```javascript
type StringOrNum = string | number;
let value: StringOrNum = "abc";
```
6.2. Interface


    interface Credentials {
    	password: string,
    	email: string
    }
	
    let creds: Credentials;
    creds = {
    	password: "abc",
    	email: "someone@gmail.com"
    }
6.2.1. A class can implement an interface


    class AuthCredentials implements Credentials {
    	password: stirng;
    	email: string;
    	authType: "MFA"
    }
In case, there is a function like this: `function login(credentials: Credentials) {}`
we can call it using 2 methods:
- `login(creds)`
- `login(new AuthCredentials())`

7.Merge types


    type Admin = {
    	permissions: string[]
    }
    
    type AppUser = {
    	username: string
    }
    
    type AppAdmin = Admin & AppUser;
    
    let admin: AppAdmin;
    admin = {
    	permissions: [],
    	username: "admin"
    }
    
    //interface
    
    interface Admin2 {
    	permissions: string[]
    }
    
    interface AppUser2 {
    	username: string;
    }
    
    interface AppAdmin2 extends Admin, AppUser {}
    
    let admin2: AppAdmin2;
    admin2 = {
    	permissions: [],
    	username: "admin"
    }

8.Generic types and functions


    type DataStorage<T> = {
    	storage: T[];
    	add: (data: T) => void;
    }
    
    const textStorage: DataStorage<string> = {
    	storage: [];
    	add(data: string) {
    		this.storage.push(data);
    	}
    }
    
    function merge<T, U>(a: T, b: U) {
    	return {...a, ...b};
    }
    
    const user = merge<{name: string}, {age: number}>({name: "Cristian"}, {age: 24});