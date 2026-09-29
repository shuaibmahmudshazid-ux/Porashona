import { cookies } from 'next/headers';
import { UserSession } from '@/types';

const SESSION_COOKIE_NAME = 'porashona_session';

export const DEMO_USERS: Record<string, UserSession & { password: string }> = {
  'teacher@porashona.com': {
    id: 'teacher-1',
    name: 'Sir Anwar Hossain',
    email: 'teacher@porashona.com',
    role: 'TEACHER',
    password: 'teacher123',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  'rahim@student.com': {
    id: 'user-std-1',
    name: 'Rahim Ahmed',
    email: 'rahim@student.com',
    role: 'STUDENT',
    studentId: 'std-001',
    password: 'student123',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  'fatima@student.com': {
    id: 'user-std-2',
    name: 'Fatima Khan',
    email: 'fatima@student.com',
    role: 'STUDENT',
    studentId: 'std-002',
    password: 'student123',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  },
};

export async function getCurrentUser(): Promise<UserSession | null> {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionValue) {
    // Default to teacher for initial zero-friction experience if no cookie set
    return null;
  }

  try {
    const session = JSON.parse(decodeURIComponent(sessionValue)) as UserSession;
    return session;
  } catch {
    return null;
  }
}

export async function setAuthSession(user: UserSession): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, encodeURIComponent(JSON.stringify(user)), {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
