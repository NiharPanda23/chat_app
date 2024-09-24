import { NextResponse } from "next/server";
import { connect } from "getstream";
import bcrypt from "bcrypt";
import { StreamChat } from "stream-chat";

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

export async function POST(req) {
  try {
    const { userName, password } = await req.json();
    if (!userName || !password) {
      return NextResponse.json(
        { message: "Username and password are required" },
        { status: 400 }
      );
    }

    const serverClient = connect(api_key, api_secret, app_id);
    const client = StreamChat.getInstance(api_key, api_secret);
    const { users } = await client.queryUsers({ name: userName });

    if (!users.length) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const user = users[0];
    const success = await bcrypt.compare(password, user.hashedPassword);

    if (!success) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }
    const token = serverClient.createUserToken(user.id);

    return NextResponse.json(
      {
        token,
        fullName: user.fullName,
        userName: user.name,
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error during login:", e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
