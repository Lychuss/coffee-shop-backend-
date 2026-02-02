import type { JwtPayload } from "jsonwebtoken"
export interface User extends JwtPayload {
    iat: number
}