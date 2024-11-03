// withAuthForLoggedInUsers.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/utils/authUtils';

export function withAuthForLoggedInUsers<P>(Component: React.ComponentType<P>) {
    return function AuthenticatedComponent(props: P) {
        const router = useRouter();

        useEffect(() => {
            const checkToken = async () => {
                const isValidToken = await verifyToken(process.env.NEXT_PUBLIC_API_URL || '');
                if (!isValidToken) {
                    router.push('/login');
                }
            };

            if (typeof window !== 'undefined') {
                checkToken();
            }
        }, [router]);

        return <Component {...(props as P & JSX.IntrinsicAttributes)} />;
    };
}
