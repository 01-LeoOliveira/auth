// authentication.ts
import { auth } from './firebaseConfig'; // Certifique-se de que o caminho esteja correto
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  GoogleAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';

// Função para registrar um usuário com email e senha
export const registerWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
  }
};

// Função para login com email e senha
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
  }
};

// Função para login com conta Google
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error);
  }
};

// Função para envio de email de recuperação de senha
export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Email de recuperação enviado");
  } catch (error) {
    console.error("Erro ao enviar email de recuperação:", error);
  }
};

// Função para deslogar
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Usuário deslogado");
  } catch (error) {
    console.error("Erro ao deslogar:", error);
  }
};
