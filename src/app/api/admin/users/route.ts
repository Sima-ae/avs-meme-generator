import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, email, name, role, created_at, last_login, is_active 
      FROM users 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('id');
    
    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }
    
    await sql`DELETE FROM users WHERE id = ${parseInt(userId)}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { userId, isActive } = await request.json();
    
    if (!userId || typeof isActive !== 'boolean') {
      return NextResponse.json({ success: false, error: 'Invalid parameters' }, { status: 400 });
    }
    
    await sql`UPDATE users SET is_active = ${isActive} WHERE id = ${parseInt(userId)}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating user status:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
