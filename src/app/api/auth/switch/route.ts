import { NextRequest, NextResponse } from 'next/server';
import { DEMO_USERS, setAuthSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    const targetUser = DEMO_USERS[email];

    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...sessionData } = targetUser;
    await setAuthSession(sessionData);

    return NextResponse.json({ success: true, user: sessionData });
  } catch (error) {
    console.error('Auth switch error:', error);
    return NextResponse.json({ error: 'Failed to switch user' }, { status: 500 });
  }
}
