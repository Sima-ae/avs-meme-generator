import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT pm.id, pm.user_id, pm.image_url, pm.title, pm.position_x, pm.position_y, pm.created_at, u.name as user_name
      FROM prikbord_memes pm
      JOIN users u ON pm.user_id = u.id
      WHERE pm.is_active = true
      ORDER BY pm.created_at DESC
    `;
    
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching memes:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const memeId = searchParams.get('id');
    
    if (!memeId) {
      return NextResponse.json({ success: false, error: 'Meme ID required' }, { status: 400 });
    }
    
    await sql`DELETE FROM prikbord_memes WHERE id = ${parseInt(memeId)}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting meme:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
