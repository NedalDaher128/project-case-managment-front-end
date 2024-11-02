import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { ComponentType } from 'react';

export function withAuthForGuests<T extends object>(Component: ComponentType<T>) {
    return function AuthenticatedComponent(props: T) {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            if (typeof window !== 'undefined') {
                const token = Cookies.get('token');
        
                if (!token) {
                    console.log('No token found, redirecting to login.');
                    router.push('/login');
                } else {
                    console.log('Token found, setting loading to false.');
                    router.push('/');
                    setLoading(false);
                }
            }
        }, [router]);

        if (loading) {
            return <div>Loading...</div>;
        }

        

        return <Component {...props} />;
    };
}
