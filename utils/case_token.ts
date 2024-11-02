import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';
import Cookies from 'js-cookie';
import axios from 'axios';
interface DecodedToken {
    [key: string]: any;
}



export function decodeToken(token: string): DecodedToken | null {
    try {
        const decoded: DecodedToken | null = jwt.decode(token) as DecodedToken | null;
        return decoded;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
