import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export function withAuthForLoggedInUsers<P>(Component: React.ComponentType<P>) {
    return function AuthenticatedComponent(props: P) {
        const router = useRouter();

        useEffect(() => {
            const verifyToken = async () => {
                const token = Cookies.get('token');
                if (!token) {
                    router.push('/login');
                    return;
                }

                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                    if (response.status !== 200) {
                        router.push('/login');
                    }
                } catch (error) {
                    console.error("Verification failed:", error);
                    router.push('/login');
                }
            };

            if (typeof window !== 'undefined') {
                verifyToken();
            }
        }, [router]);

        return <Component {...(props as P & JSX.IntrinsicAttributes)} />;
    };
}
