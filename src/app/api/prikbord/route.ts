import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT id, image_url, title, position_x, position_y, user_id
      FROM prikbord_memes 
      WHERE is_active = true
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching memes:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { imageUrl, title, userId, x, y } = await request.json();
    
    const positionX = x || Math.round(Math.random() * 300 + 50);
    const positionY = y || Math.round(Math.random() * 200 + 50);
    
    const { rows } = await sql`
      INSERT INTO prikbord_memes (user_id, image_url, title, position_x, position_y)
      VALUES (${userId}, ${imageUrl}, ${title || 'Meme Kaart'}, ${positionX}, ${positionY})
      RETURNING id, image_url, title, position_x, position_y, user_id
    `;
    
    return NextResponse.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error adding meme:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID is required' }, { status: 400 });
    }
    
    await sql`DELETE FROM prikbord_memes WHERE id = ${parseInt(id)}`;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting meme:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, x, y } = await request.json();
    
    await sql`
      UPDATE prikbord_memes 
      SET position_x = ${x}, position_y = ${y}
      WHERE id = ${id}
    `;
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating position:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
