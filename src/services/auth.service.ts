import bcrypt from 'bcryptjs';
import { UnauthorizedError, BadRequestError } from '../utils/errors';
import { generateTokens, verifyToken } from '../utils/jwt';

// Tipos para o service
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
}

interface AuthUser {
  id: string;
  name: string;
  email: string;
  userType: string;
}

export class AuthService {
  // Registrar novo usuário
  static async register(userData: RegisterData): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    const { name, email, password } = userData;

    // Validações básicas
    if (!name || !email || !password) {
      throw new BadRequestError('Nome, email e senha são obrigatórios');
    }

    if (password.length < 8) {
      throw new BadRequestError('Senha deve ter pelo menos 8 caracteres');
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // TODO: Verificar se email já existe no banco
    // TODO: Salvar no banco de dados
    
    // Por enquanto, simulando usuário criado
    const newUser: AuthUser = {
      id: 'temp-uuid-123',
      name,
      email,
      userType: 'student',
    };

    // Gerar tokens
    const tokens = generateTokens({ userId: newUser.id, email: newUser.email });

    return { user: newUser, tokens };
  }

  // Login do usuário
  static async login(loginData: LoginData): Promise<{ user: AuthUser; tokens: AuthTokens }> {
    const { email, password } = loginData;

    // Validações básicas
    if (!email || !password) {
      throw new BadRequestError('Email e senha são obrigatórios');
    }

    // TODO: Buscar usuário no banco pelo email
    // Por enquanto, simulando usuário encontrado
    const userFromDB = {
      id: 'temp-uuid-123',
      name: 'Usuário Teste',
      email,
      password: await bcrypt.hash('123456789', 12), // Senha: 123456789
      userType: 'student',
    };

    // Se não encontrar usuário
    if (!userFromDB) {
      throw new UnauthorizedError('Email ou senha incorretos');
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, userFromDB.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Email ou senha incorretos');
    }

    // Usuário autenticado
    const user: AuthUser = {
      id: userFromDB.id,
      name: userFromDB.name,
      email: userFromDB.email,
      userType: userFromDB.userType,
    };

    // Gerar tokens
    const tokens = generateTokens({ userId: user.id, email: user.email });

    return { user, tokens };
  }

  // Refresh token
  static async refreshToken(refreshToken: string): Promise<AuthTokens> {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token é obrigatório');
    }

    try {
      // Verificar refresh token
      const decoded = verifyToken(refreshToken, 'refresh');
      
      // TODO: Verificar se refresh token existe no banco e não foi revogado
      
      // Gerar novos tokens
      const tokens = generateTokens({ 
        userId: decoded.userId, 
        email: decoded.email 
      });

      return tokens;
    } catch (error) {
      throw new UnauthorizedError('Refresh token inválido ou expirado');
    }
  }

  // Logout (invalidar refresh token)
  static async logout(refreshToken: string): Promise<void> {
    if (!refreshToken) {
      return; // Se não tem refresh token, já está "deslogado"
    }

    // TODO: Invalidar refresh token no banco
    // Por enquanto, apenas simula o logout
    console.log('Logout realizado para refresh token:', refreshToken.substring(0, 20) + '...');
  }
}
