// withAuthForGuests.tsx
import { useRouter } from 'next/navigation';
import { useEffect, useState, ComponentType } from 'react';
import { verifyToken } from '@/utils/authUtils';

export function withAuthForGuests<T extends object>(Component: ComponentType<T>) {
    return function AuthenticatedComponent(props: T) {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            const checkToken = async () => {
                const isValidToken = await verifyToken(process.env.NEXT_PUBLIC_API_URL || '');
                if (!isValidToken) {
                    console.log('No valid token, redirecting to login.');
                    router.push('/login');
                } else {
                    console.log('Valid token found, redirecting to home.');
                    router.push('/');
                    setLoading(false);
                }
            };

            if (typeof window !== 'undefined') {
                checkToken();
            }
        }, [router]);

        return <Component {...props} />;
    };
}
