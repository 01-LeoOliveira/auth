"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, AuthError } from 'firebase/auth';
import { auth, db } from '../app/src/firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';


interface FormData {
  name: string;
  email: string;
  password: string;
}

const Members = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const createUserDocument = async (userId: string, userData: Partial<FormData>) => {
    try {
      await setDoc(doc(db, 'users', userId), {
        ...userData,
        role: 'member',
        createdAt: new Date().toISOString(),
        isSubscribed: false
      });
    } catch (error) {
      console.error("Erro ao criar documento do usuário:", error);
      throw error;
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verificar se o usuário já existe no Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));

      if (!userDoc.exists()) {
        // Se não existe, criar novo documento
        await createUserDocument(user.uid, {
          name: user.displayName || '',
          email: user.email || '',
        });
      }

      router.push('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      setError('Erro ao fazer login com Google: ' + authError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
        throw new Error('Por favor, preencha todos os campos');
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await createUserDocument(userCredential.user.uid, {
        name: formData.name,
        email: formData.email,
      });

      router.push('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      const errorMessages: { [key: string]: string } = {
        'auth/email-already-in-use': 'Este email já está cadastrado',
        'auth/invalid-email': 'Email inválido',
        'auth/operation-not-allowed': 'Operação não permitida',
        'auth/weak-password': 'Senha muito fraca'
      };

      setError(errorMessages[authError.code] || authError.message || 'Erro ao cadastrar usuário');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!formData.email || !formData.password) {
        throw new Error('Por favor, preencha todos os campos');
      }

      await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      router.push('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      const errorMessages: { [key: string]: string } = {
        'auth/invalid-email': 'Email inválido',
        'auth/user-disabled': 'Usuário desabilitado',
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha incorreta'
      };

      setError(errorMessages[authError.code] || authError.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white bg-cover bg-center"
      style={{
        backgroundImage: `url('/img/fundo.jpg')`
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md"></div>
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-white tracking-wide drop-shadow-md">
          Área de Membros Cindy Trans
        </h1>

        <div className="bg-black bg-opacity-80 p-8 rounded-lg shadow-lg w-full">
          <h2 className="text-3xl font-semibold text-center mb-4">
            {isLogin ? 'Login' : 'Torne-se Membro'}
          </h2>

          <p className="text-center text-gray-300 mb-6">
            {isLogin
              ? 'Faça login para acessar conteúdos exclusivos.'
              : 'Para acessar conteúdos exclusivos, torne-se um membro e aproveite vídeos e fotos especiais.'}
          </p>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 px-4 py-2 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                  Nome Completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="mt-1 block w-full bg-gray-700 text-gray-200 rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full bg-gray-700 text-gray-200 rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                Senha
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full bg-gray-700 text-gray-200 rounded-lg p-3 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processando...' : isLogin ? 'Login' : 'Cadastrar-se'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-black text-gray-400">Ou continue com</span>
            </div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-white text-gray-800 font-bold py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="/img/google-icon.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Google</span>
          </button>

          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setFormData({ name: '', email: '', password: '' });
            }}
            className="mt-6 text-sm text-gray-400 hover:text-white transition-all duration-300 ease-in-out w-full text-center"
            disabled={loading}
          >
            {isLogin ? 'Ainda não tem uma conta? Cadastre-se' : 'Já tem uma conta? Faça login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Members;