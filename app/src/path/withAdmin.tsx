import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './to/AuthContext';

export function withAdmin<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAdminComponent(props: P) {
    const { user, userRole, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && (!user || userRole !== 'admin')) {
        router.push('/dashboard');
      }
    }, [user, userRole, loading, router]);

    if (loading) {
      return <div>Carregando...</div>;
    }

    if (!user || userRole !== 'admin') {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}