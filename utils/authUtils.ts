// authUtils.ts
import Cookies from 'js-cookie';
import axios from 'axios';

export async function verifyToken(apiUrl: string): Promise<boolean> {
    const token = Cookies.get('token');
    if (!token) {
        return false;
    }
    try {
        const response = await axios.post(
            `${apiUrl}/auth/verify`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.status === 200;
    } catch (error) {
        console.error("Verification failed:", error);
        return false;
    }
}