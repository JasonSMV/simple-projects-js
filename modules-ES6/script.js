// You have to import it with the exact same name that it is in the user js file.
// Or you can change the name using the "as" keyword.
import { me as kyle, sally, printUser } from "./user.js";

console.log(kyle, sally);

printUser(kyle);
