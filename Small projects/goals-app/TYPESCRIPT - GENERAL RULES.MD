# TypeScript

## General rules
- **A variable can hold multiple knew values** 
`let userID: string | number;`
- **Custom object**
```javascript
    let user: {
    	name: string,
    	age: number,
    	isAdmin: boolean,
    	id: string | number
    }
```
	- mark a field as optional using "?"
```javascript
    let user: {
    	name: string,
    	age?: number,
    	isAdmin: boolean,
    	id: string | number
    }
```
- **Arrays** 
`let hobbies: Array<string>` is the same thing as writting `let hobbies: string[]`
- **Literal types** 
`let role: "admin" | "user" | "editor" | 18`
	- **typeof - get the type of a variable** 
```javascript
    function performAction (action: string, role: Role) {
    	if(role === "admin" && typeof action === "string")
    }
```
	- **"something" in a variable**
The below code will not work, the error received is: "User only refers to a type, but it is being used as a value".
```javascript
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
```
The solution is to replace the body of the login function with `if('permissions' in u) {}`
-  **Set the type of the parameters and the return value for a functio**n `function add(a: number, b: number): void {}`
- **Create custom types**
	- **Type **
```javascript
type StringOrNum = string | number;
let value: StringOrNum = "abc";
```
	- **Interface**
```javascript
    interface Credentials {
    	password: string,
    	email: string
    }
	
    let creds: Credentials;
    creds = {
    	password: "abc",
    	email: "someone@gmail.com"
    }
```
		-  **A class can implement an interface**
```javascript
    class AuthCredentials implements Credentials {
    	password: stirng;
    	email: string;
    	authType: "MFA"
    }
```
In case, there is a function like this: `function login(credentials: Credentials) {}`
we can call it using 2 methods:
			- `login(creds)`
			- `login(new AuthCredentials())`

-  **Merge types**
```javascript
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
```

-  **Generic types and functions**
```javascript
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
```