import { Employee } from "../repositories/employeeRepository"
import * as error from "../utils/errorUtils.js"

export function unregisteredEmployee(employee: Employee){
  if(!employee) throw error.notFound("Employee not registered")
}