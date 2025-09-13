import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `meme_${timestamp}_${file.name}`;
    const filepath = join(process.cwd(), 'public', 'images', 'uploads', filename);
    const publicUrl = `/images/uploads/${filename}`;

    // Save file to disk
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Generate random position for prikbord
    const x = Math.floor(Math.random() * 300 + 50);
    const y = Math.floor(Math.random() * 200 + 50);

    // Save to database
    const { rows } = await sql`
      INSERT INTO prikbord_memes (user_id, image_url, title, position_x, position_y)
      VALUES (${parseInt(userId)}, ${publicUrl}, ${title || 'Generated Meme'}, ${x}, ${y})
      RETURNING id, image_url, title, position_x, position_y, user_id
    `;

    return NextResponse.json({
      success: true,
      data: {
        id: rows[0].id,
        imageUrl: rows[0].image_url,
        title: rows[0].title,
        x: rows[0].position_x,
        y: rows[0].position_y,
        userId: rows[0].user_id
      }
    });

  } catch (error) {
    console.error('Error uploading meme:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
